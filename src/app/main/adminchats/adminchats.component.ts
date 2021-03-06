import { Component, OnInit,Injector } from '@angular/core';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { BaseComponent } from '../../lib/base.component';
import { AuthenticationService } from '../../lib/authentication.service';


@Component({
  selector: 'app-adminchats',
  templateUrl: './adminchats.component.html',
  styleUrls: ['./adminchats.component.css']
})
export class AdminchatsComponent extends BaseComponent implements OnInit {

  info: any;
  infos: any;
  title = 'angular-chat';
  channel: ChannelData;
  username = '';
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  currentUser: User;
  constructor( injector: Injector,private authenticationService: AuthenticationService) { super(injector);}

  ngOnInit(): void {
  }

  async joinChat() {
    const { username } = this;
    try {
      const response = await axios.post('http://localhost:5500/join', {
        username,
      });
      const { token } = response.data;
      const apiKey = response.data.api_key;

      this.chatClient = new StreamChat(apiKey);

      this.currentUser = await this.chatClient.setUser(
        {
          id: username,
          name: username,
        },
        token
      );

      const channel = this.chatClient.channel('team', 'talkshop');
      await channel.watch();
      this.channel = channel;
      this.messages = channel.state.messages;
      this.channel.on('message.new', event => {
        this.messages = [...this.messages, event.message];
      });

      const filter = {
        type: 'team',
        members: { $in: [`${this.currentUser.me.id}`] },
      };
      const sort = { last_message_at: -1 };

      this.channelList = await this.chatClient.queryChannels(filter, sort, {
        watch: true,
        state: true,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      await this.channel.sendMessage({
        text: this.newMessage,
      });
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }

}
