import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

    users = [
        'assets/imgs/user1.jpg',
        'assets/imgs/user2.jpg',
        'assets/imgs/user3.jpg',
        'assets/imgs/user4.jpg',
        'assets/imgs/user5.jpg',
    ];
  reviews = [
      {
          no: '5',
          per : 70
      },
      {
          no: '4',
          per : 62
      },
      {
          no: '3',
          per : 57
      },
      {
          no: '2',
          per : 42
      },
      {
          no: '1',
          per : 37
      },
  ];
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

    getBackground(start, end) {
        // const style = { background : `linear-gradient(${start},${end})`};
        // const style = 'linear-gradient(to right, black 0%, black 60%, #EEEEEE 50%, #EEEEEE 100%)';
        const style = 'linear-gradient(to right, black 0%, black ' + end + '%, #EEEEEE ' + end + '% , #EEEEEE 100%)';
        console.log(start, end, style);
        return (style);
    }

    goToBack() {
        this.navCtrl.back();
    }

}
