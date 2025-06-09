io.on('connection', (socket) => {
    console.log(`🔌 New socket connection: ${socket.id}`);

    socket.on('sendMessage', async (payload) => {
        console.log('📨 Received sendMessage:', payload);

        // ✅ Immediately emit to all clients
        io.emit('newMessage', payload);

        try {
            // 📤 Then send to WhatsApp API
            await axios.post(
                `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log('✅ WhatsApp message sent.');
        } catch (error) {
            console.error('❌ Error sending message:', error.response?.data || error.message);
            // Optional: emit a delivery error
            socket.emit('messageError', {
                to: payload.to,
                error: error.response?.data || error.message
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
    });
});
