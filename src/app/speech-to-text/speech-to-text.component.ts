import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { DataService } from './../service/data.service';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { Soliboat } from './../models/soliboat';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css'],
  providers: [VoiceRecognitionService]
})



export class SpeechToTextComponent implements OnInit {

  constructor(public service: VoiceRecognitionService, public dataService: DataService, private fb: FormBuilder) { this.service.init(); }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public scrolledToBottom = false;
  public CurrentTime: any = new Date().getHours() + 1;
  public AskQuestion: any = {};
  @ViewChild('askquestions') public askquestions: NgForm;
  public buttonFlagOnOff = false;

  msgList: Array<Soliboat> = [];
  public modelChange = false;
  public textButtonDisabled = false;
  selectedDevice = 'en';


  contactForm: FormGroup;

  languages = [
    { id: 'en', name: 'English' },
    { id: 'kn', name: 'Kannada' },
    { id: 'hi', name: 'Hindi' },
    { id: 'ta', name: 'Tamil' },
  ];

  ngOnInit(): void {
    this.AskQuestion.question = '';
    this.contactForm = this.fb.group({
      language: [null]
    });
  }

  onChange(newValue) {
    console.log(newValue);
    this.selectedDevice = newValue;
  }
  openOrColse() {
    if (document.getElementById('myForm').style.display !== 'block') {
      const params = { query: '', category: 'General',
      time: this.CurrentTime, latitude: '37.4219983',
      longitude: '-122.084', language: 'en', device_id: '637db77e4f3f563a' };
      this.loadChatData(params);
      document.getElementById('myForm').style.display = 'block';
    } else {
      document.getElementById('myForm').style.display = 'none';
      this.msgList.splice(0, );
      this.selectedDevice = 'en';
    }

  }
  askQuestion() {
    const params = {
      query: this.AskQuestion.question, category: 'General',
      time: this.CurrentTime, latitude: '37.4219983',
      longitude: '-122.084', language: 'en', device_id: '637db77e4f3f563a'
    };
    this.service.text = '';
    this.AskQuestion.question = '';
    this.loadChatData(params);
  }


  AfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (!this.scrolledToBottom) {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) { }
  }
  onScroll() {
    this.scrolledToBottom = true;
  }

  startService() {
    this.buttonFlagOnOff = true;
    this.AskQuestion.question = '';
    this.service.text = '';
    this.service.start(this.selectedDevice);
    this.AskQuestion.question = this.service.text;
  }
  stopService() {
    this.service.stop();
    this.buttonFlagOnOff = false;
    console.log(this.service.text)
    if (this.service.text !== '') {
      const params = {
        query: this.service.text, category: 'General',
        time: this.CurrentTime, latitude: '37.4219983',
        longitude: '-122.084', language: 'en', device_id: '637db77e4f3f563a'
      };
      console.log(params);
      this.service.text = '';
      this.AskQuestion.question = '';
      this.loadChatData(params);
    } else {
      this.service.text = '';
      this.AskQuestion.question = '';
      console.log('No data found on stop service');
    }
  }

  loadChatData(params) {
    this.textButtonDisabled = true;
    this.modelChange = false;
    const customObj = new Soliboat(1, '', '', '');
    customObj.id = 1;
    customObj.data = params.query;
    customObj.image = '';
    customObj.video = '';
    this.msgList.push(customObj);
    this.AskQuestion.question = null;
    params.query = (params.query === '') ? 'Hi' : params.query;
    this.dataService.postSoliBoat(params, 'home').subscribe(
      data => {
        const customObj2 = new Soliboat(1, '', '', '');
        customObj2.id = 2;
        customObj2.data = data['response'];
        customObj2.image = data['image'];
        customObj2.video = data['video'];
        this.msgList.push(customObj2);
        console.log(data);
        this.AskQuestion.question = null;
        this.textButtonDisabled = false;
      },
      error => {
        const customObj3 = new Soliboat(1, '', '', '');
        customObj3.id = 3;
        customObj3.data = 'INTERNAL SERVER ERROR';
        customObj3.image = '';
        customObj3.video = '';
        this.msgList.push(customObj3);
        console.log('error');
        this.textButtonDisabled = false;
      }
    );
  }
  modelChangeFn(event) {
    if (event) {
      console.log('true ' + event);
      this.modelChange = true;
    } else {
      console.log('false ' + event);
      this.modelChange = false;
    }
  }
}
