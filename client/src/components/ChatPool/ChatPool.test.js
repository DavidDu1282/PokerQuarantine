import ChatPool from './ChatPool';
import { expect } from 'chai';

describe('class ChatPool', function() {
  beforeAll(function(done) {
    this.channelId = 'testChannel';
    this.chatPool = new ChatPool();
    this.chatPool.init({
      id: '1'
    }, {
      current: {}
    }).then(() => {
    
      this.chatPool.cache = {
        'testChannel': { messages: [] }
      }
      done()
    });
  });

  it('add messages', function (done) {
    this.chatPool.addMessage({channelId: this.channelId, context: 'hello'})
      .then(() => {
        expect(this.chatPool.cache[this.channelId].messages[0].context).to.equal('hello');
        done();
      });
  });

});