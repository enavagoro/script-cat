import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController,ActionSheetController} from '@ionic/angular';
import { ConverterToHtmlService } from '../_services/convert-to-html.service';
import { TransporterService } from '../_services/transporter.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  elements = [];
  flagArticle = false;

  constructor(private alertController :AlertController, private converter: ConverterToHtmlService, private transporter: TransporterService) {}

  deleteElement(index){
    this.elements.splice(index, 1);
  }

  pushTitle(){
   var element = {type:'text',name:'title',content:''}
   this.elements.push(element);
   console.log(this.elements);
 }

 pushHeader(){
  var element = {type:'text',name:'header',content:'',id:''}
  this.elements.push(element);
  console.log(this.elements);
}

 pushParagraph(){
   var element = {type:'textarea',name:'paragraph',content:''}
   this.elements.push(element);
   console.log(this.elements);
 }

 pushLink(){
   var element = {type:'text',name:'link',content:'',url:''}
   this.elements.push(element);
   console.log(this.elements);
 }

 pushImage(){
   var element = {type:'image',name:'image',width:'',url:'',class:''}
   this.elements.push(element);
   console.log(this.elements);
 }

 generateArticle(){
   if(this.elements.length==0){
     this.error();
   }
   this.converter.sendElements(this.elements);
   var body = this.converter.getElements();
   console.log('body mandado',body);
   this.transporter.transportHtmlBody(body).subscribe(result => (console.log('result',result)));
 }

 changeFlag(value){
   this.flagArticle = value;
 }

 async error() {
   //console.log(this.gasto);

   const alert = await this.alertController.create({
     header: 'Miau  >:C !!!',
     message: 'You need to add an element before you generate your article!!!',
     buttons: [{
         text: 'Okay',
         handler: () => {

         }
       }
     ]
   });

   await alert.present();
 }

}
