import { Component, OnInit, Injector } from '@angular/core';
import { StreamChat, ChannelData, Message, User } from 'stream-chat';
import axios from 'axios';
import { BaseComponent } from '../../lib/base.component';
import { AuthenticationService } from '../../lib/authentication.service';


@Component({
  selector: 'app-phuhuynhchat',
  templateUrl: './phuhuynhchat.component.html',
  styleUrls: ['./phuhuynhchat.component.css']
})
export class PhuhuynhchatComponent extends BaseComponent implements OnInit {

  info: any;
  infos: any;
  title = 'angular-chat';
  channel: ChannelData;
  username: any;
  messages: Message[] = [];
  newMessage = '';
  channelList: ChannelData[];
  chatClient: any;
  currentUser: User;
  constructor(injector: Injector, private authenticationService: AuthenticationService) { super(injector); }

  ngOnInit(): void {
    // this.info = this.authenticationService.userValue.username;
    // this._api.get('/api/HocSinh/get-by-id/' + this.info).takeUntil(this.unsubscribe).subscribe(res => {
    //   this.infos = res;
    //   this.username = this.infos.hotencha;
    // });
    // this.joinChat();
  }

  async joinChat() {
    const { username } = this;
    try {
      const response = await axios.post('http://localhost:5500/join', {
        username
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
      console.log('a');
      
      return;
    }
    else {
      try {
        await this.channel.sendMessage({
          text: this.newMessage
        });
        this.newMessage = '';
      } catch (err) {
        console.log(err);
      }
    }
  }

}
