export default function handler(req, res) {  
  if (req.method !== 'GET') {  
    res.status(405).json({ message: 'Only GET requests are allowed' });  
    return;  
  }  
 
  // Set headers for WebSocket upgrade  
  res.setHeader('Content-Type', 'application/json');  
  res.setHeader('Connection', 'Upgrade');  
  res.setHeader('Upgrade', 'websocket');  
 
  // Handle WebSocket connection  
  const { WebSocketServer } = require('ws');  
  const wss = new WebSocketServer({ noServer: true });  
 
  wss.on('connection', (ws) => {  
    console.log('Client connected');  
 
    ws.on('message', (message) => {  
      console.log(`Received message => ${message}`);  
 
      // Echo the message back to the client  
      ws.send(`Server received: ${message}`);  
    });  
 
    ws.on('close', () => {  
      console.log('Client disconnected');  
    });  
 
    ws.on('error', (error) => {  
      console.error(`WebSocket error: ${error}`);  
    });  
  });  
 
  // Upgrade the incoming request to a WebSocket connection  
  const { socket, head } = req;  
  wss.handleUpgrade(req, socket, head, (ws) => {  
    wss.emit('connection', ws, req);  
  });  
 
  // Prevent response from closing the connection  
  res.end();  
}