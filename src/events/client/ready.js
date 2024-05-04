module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        setInterval(client.pickPresence, 5000) // Every 5 seconds the presence changes in pickPresence.js
    }
}