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

 confirmArticle(){
   if(this.elements.length==0){
     this.error();
   }
   else{
     this.okay();
   }
 }

 generateArticle(){
   this.converter.sendElements(this.elements);
   var body = this.converter.getElements();
   this.transporter.transportHtmlBody(body).subscribe(result => {
     this.transporter.getFiles()
   });
 }

 changeFlag(value){
   this.flagArticle = value;
 }


 async error() {
   //console.log(this.gasto);

   const alertError = await this.alertController.create({
     header: 'Miau  >:C !!!',
     message: 'You need to add an element before you generate your article!!!',
     buttons: [{
         text: 'Okay',
         handler: () => {

         }
       }
     ]
   });

   await alertError.present();
 }

 async okay() {
   //console.log(this.gasto);

   const alertOkay = await this.alertController.create({
     header: 'Miau  :3 !!!',
     message: 'are you sure you want to generate an article?!',
     buttons: [
       {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        //console.log('Cancelado');
        }},{
         text: 'Okay',
         handler: () => {
           this.generateArticle();
         }
       }
     ]
   });

   await alertOkay.present();
 }

}
