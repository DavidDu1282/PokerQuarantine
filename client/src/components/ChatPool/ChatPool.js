import axios from 'axios';

class ChatPool {
  constructor() {
    this.cache = []; // stores cached messages
    this.cache_users = {}; // stores cached users
  }

  async init(user, chat) {
    // initiallize the full chatpool after login
    
    this.user = user;
    this.chat = chat.current;

    if (process.env.NODE_ENV !== 'test') {
      axios.get('/messages/all')
        .then((res) => {
          this.cache = res.data;
        });
    }
  }

  addMessage(msg) {
    // msg: { channelId, context }
    // msg_: { messageId, userId, channelId, context, timestamp, }

    var msg_ = {
      userId: this.user.id,
      channelId: msg.channelId,
      context: msg.context,
      timestamp: Date.now()      
    }
    this.postMessage(msg_)
      .then((id) => {
        msg_.id = id;
        this.cache.push(msg_);

        if (process.env.NODE_ENV !== 'test') {
          try {
            this.chat.push(msg_);
          } catch (e) { /* msg board not in foucus */ }
        }
      });
    
  }
  
  async postMessage(msg) {
    // sync message to db

    if (process.env.NODE_ENV === 'test') return Object.keys(this.cache).length + 1;
  
    return await axios.post('/messages/add', msg)
      .then((res) => {
        return res.data;
      })
  }

  async findMessage(messageId) {
    // find message by id

    let result = this.cache.filter((msg) => {
      return msg.messageId === messageId;
    });

    if (result.length === 1) return result[0];
    return null;
  }

  async findMessages(filter) {
    // filter message and sort them by time

    return this.cache
      .filter((msg) => {
        return (
          (filter.messageId ? msg.messageId === filter.messageId : true)
          && (filter.userId ? msg.userId === filter.userId : true)
          && (filter.channelId ? msg.channelId === filter.channelId : true)
        );
      })
      .sort((a, b) => {
        (+a >= +b) ? 1 : -1
      });
  }

  async reset() {
    this.cache = {};
    this.cache_users = {};
    this.user = null;
    this.chat = null;
  }
}

export default ChatPool;