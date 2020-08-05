import axios from 'axios';
import passport from 'passport';

class ChatPool {
  constructor(client) {
    this.client = client;
    this.cache = {}; // store cached channels
    this.cache_users = {}; // stores cached users
    this.ready = false;
  }

  getUser(userId) {
    if (!this.cache_users[userId]) {
      return this.cacheUser(userId).then(() => {return this.cache_users[userId]});
    } else {
      return this.cache_users[userId];
    }
  }

  async cacheUser(userId) {
    if (this.cache_users[userId]) return;
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        this.cache_users[userId] = res.data;
      });
  }

  async init(user, chat) {
    // initiallize the full chatpool after login
    
    this.user = user;
    this.chat = chat;
    this.cache_users[user.id] = user.userdata;

    if (process.env.NODE_ENV !== 'test') {
      axios.get('/api/message/all')
        .then((res) => {
          this.splitChannel(res.data)
            .then(() => {
              this.ready = true;
              if (process.env.NODE_ENV === 'development') console.log('cache loaded');
              try {
                this.chat.current.updateReady(true);
              } catch (e) { /* msg board not in foucus */ }
            });
        });
    }
  }

  recieveMessage(msg) {
    if (!this.cache[msg.channelId]) return;

    if (!this.cache_users[msg.userId] && process.env.NODE_ENV !== 'test') {
      this.cacheUser(msg.userId)
        .then(() => {
          this.cache[msg.channelId].messages.push(msg);
          try {
            this.chat.current.update();
          } catch (e) { /* msg board not in foucus */ }
        });
    } else {
      this.cache[msg.channelId].messages.push(msg);
      if (process.env.NODE_ENV !== 'test') {
        try {
          this.chat.current.update();
        } catch (e) { /* msg board not in foucus */ }
      }
    }
    
  }

  async addMessage(msg) {
    // msg: { channelId, context }
    // msg_: { messageId, userId, channelId, context, timestamp, }

    var msg_ = {
      userId: this.user.id,
      channelId: msg.channelId,
      context: msg.context,
      timestamp: Date.now()      
    }
    await this.postMessage(msg_)
      .then((id) => {
        msg_.messageId = id;
        this.cache[msg.channelId].messages.push(msg_);

        this.client.socket.emit('chat', msg_);

        if (process.env.NODE_ENV !== 'test') {
          try {
            this.chat.current.update();
          } catch (e) { /* msg board not in foucus */ }
        }
      });
    
  }
  
  async postMessage(msg) {
    // sync message to db

    if (process.env.NODE_ENV === 'test') return Object.keys(this.cache).length + 1;
  
    return await axios.post('/api/message/post', msg)
      .then((res) => {
        return res.data;
      })
  }

  async splitChannel(channels) {
    // split cached messages to channels

    channels.map((channel) => {
      this.cache[channel.channelId] = channel;
      if (process.env.NODE_ENV !== 'test') {
        channel.messages.map(async (message) => {
          if (!this.cache_users[message.userId]) await this.cacheUser(message.userId);
        });
      }
    });
  }

  async reset() {
    this.cache = {};
    this.cache_users = {};
    this.user = null;
    this.chat = null;
    this.ready = false;
  }
}

export default ChatPool;