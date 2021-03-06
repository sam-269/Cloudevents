import { Component } from '@angular/core';
import {formatDate } from '@angular/common';
import Cloudevent, {
  event,
  StructuredHTTPEmitter,
  BinaryHTTPEmitter,
  StructuredHTTPReceiver,
  BinaryHTTPReceiver
} from 'cloudevents-sdk/v1';
import { uuid } from 'uuidv4';
import { isUuid } from 'uuidv4';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'CloudEventsApp';
  today= new Date();
  todaysDataTime = '';
  current_time;

  getTime()
  {
    this.current_time = this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss a', 'en-US', '+0530');
    return this.current_time;
  }

  getUUID()
  {
    return '75442486-0878-440c-9db1-a7006c25a39f';
  }

  isUUID()
  {
    if(isUuid('75442486-0878-440c-9db1-a7006c25a39f'))
    {
      return "yes";
    }
    return "no";
  }

  doSomeStuff() 
  {
    
    // let myevent: Cloudevent = event()
    //   .source('/src/assets/eventdata.json')
    //   .type('type')
    //   .time(this.getTime());

    // console.log(myevent.toString());

    
    
    const myevent: Cloudevent = event()
      .id(this.getUUID())
      .source('/src/assets/eventdata.json')
      .type('type')
      .dataContentType('text/plain')
      .dataschema('http://d.schema.com/my.json')
      .subject('cha.json')
      .data('my-data')
      .addExtension("my-ext", "0x600")
      .time(this.getTime());
  
     console.log(myevent.toString());
  //   console.log(myevent.getExtensions());
  
    let config = {
      method: "POST",
      url   : "https://enu90y24i64jp.x.pipedream.net/"
    };
  
  // ------ emitter structured
    let structured = new StructuredHTTPEmitter(config);
    structured.emit(myevent).then(res => {
      // success
      console.log("Structured Mode: Success!")
    })
    .catch(err => {
      // error
      console.error(err);
    });
  
  //   // ------ emitter binary
  //   let binary = new BinaryHTTPEmitter(config);
  //   binary.emit(myevent).then(res => {
  //     console.log("Binary Mode: Success!");
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  
    // ------ receiver structured
    let payload = myevent.toString();
    let headers = {
      "Content-Type":"application/cloudevents+json"
    };
  
    let receiverStructured = new StructuredHTTPReceiver();
    console.log(receiverStructured.parse(payload, headers).toString());
  
  //   // ------ receiver binary
    let extension1 = "mycuston-ext1";
    let data = {
      "data" : "dataString"
    };
    var attributes = {
      "ce-type"        : "type",
      "ce-specversion" : "1.0",
      "ce-source"      : "source",
      "ce-id"          : "id",
      "ce-time"        : this.getTime(),
      "ce-dataschema"  : "http://schema.registry/v1",
      "Content-Type"   : "application/json",
      "ce-extension1"  : extension1
    };
  
  //   let receiverBinary = new BinaryHTTPReceiver();
  //   console.log(receiverBinary.parse(data, attributes).toString());
  
    return true;
  }
}
