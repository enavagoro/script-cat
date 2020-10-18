/*import { HttpClient, HttpHeaders } from '@angular/common/http';*/
import { Injectable } from '@angular/core';
@Injectable()

export class ConverterToHtmlService {
  elements = [];
  body = '';
  style = '';
  stylePhone = '';

  constructor() {

  }

  sendElements(elements){
    this.elements = elements;
    this.convertToHtml();
  }

  convertToHtml(){
    var content = '';
    var style = '';
    var stylePhone = '';

    for(let element of this.elements){
      if(element.name == 'title'){
        let label = '<h1 class="title">'+element.content+'</h1>';
        content += label;
      }
      if(element.name == 'link'){
        let label = `<ul><li><p class="paragraph"><a href="`+element.url+`" target="_blank">&#9679;`+element.content+`</a></p></li></ul>`;
        content += label;
      }
      if(element.name == 'paragraph'){
        let label = '<p class="paragraph">'+element.content+'</p>';
        content += label;
      }
      if(element.name == 'header'){
        let label = '<h1 class="header" id='+element.id+'>'+element.content+'</h1>';
        content += label;
      }
      if(element.name == 'image'){
        let label =
        `
        <div class="image-container">
          <img class="`+element.class+`" src='`+element.url+`'>
        </div>`;

        content += label;

        let classCss =
        `.`+element.class+`{
          width:`+element.width+`;
          margin-left: calc((100% - `+element.width+`)/2);
        }`;

        style += classCss;

        let classCssPhone =
        `.`+element.class+`{
            width: 300px;
            margin-left: calc((100% - 300px)/2);
        }`;

        stylePhone += classCssPhone;
      }
    }

    this.body = content;
    this.style = style;
    this.stylePhone = stylePhone;
  }

  getElements(){
    var tempArray = [];

    tempArray.push(this.body);
    tempArray.push(this.style);
    tempArray.push(this.stylePhone);

    return tempArray;
  }
}
