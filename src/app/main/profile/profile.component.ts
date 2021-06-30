import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileInfo: any = {
        name: 'Admin',
        profession: 'Người quản trị',
        location: 'Hưng Yên, Việt Nam',
        img: './assets/demo/img/contacts/2.jpg',
        summary: 'Người quản lý của người, có mọi quyền chỉnh sửa các chức năng',
        contacts: [
            {
                icon: 'phone',
                value: '0947816387'
            },
            {
                icon: 'email',
                value: 'longnguyennhnd@gmail.com'
            },
            {
                icon: 'twitter',
                value: '@longnguyennhnd'
            }
        ]
    };

    profileSearch: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
