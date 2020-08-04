import ChatPool from './ChatPool';
import { expect } from 'chai';

describe('class ChatPool', function() {
  beforeAll(async function() {
    this.chatPool = new ChatPool();
    await this.chatPool.init({
      id: 1
    }, {
      current: {}
    });

    expect(this.chatPool).to.be.not.null;
  });

  it('appends message to child chats', function() {
    setTimeout(async () => {
      this.chatPool.addMessage({
        channelId: 1,
        context: 'helloWorld'
      });

      expect(this.chatPool.cache[0].context).to.equal('helloWorld');
    }, 1000);
    
  });

  it('gets messages', function() {
    setTimeout(async () => {
      let message1 = await this.chatPool.findMessage(1);
      expect(message1.context).to.equal('helloWorld');

      this.chatPool.cache[2] = {
        messageId: 2,
        userId: 2,
        channelId: 1,
        context: 'sharedChannel',
        timestamp: Date.now()
      };

      await this.chatPool.addMessage({
        channelId: 2,
        context: 'sharedUser'
      });

      let messageWithSameUser = await this.chatPool.findMessages({
        userId: 1,
      });
      expect(messageWithSameUser).to.have.lengthOf(2);

      let messageWithSameChannel = await this.chatPool.findMessages({
        channelId: 1,
      });
      expect(messageWithSameChannel).to.have.lengthOf(2);

      let multifiltering = await this.chatPool.findMessages({
        channelId: 1,
        userId: 1
      });
      expect(multifiltering).to.have.lengthOf(1);

      let incorrectInput = await this.chatPool.findMessages({
        channelId: 1,
        userId: 5
      });
      expect(incorrectInput).to.have.lengthOf(0);
    }, 2000);
  });

});