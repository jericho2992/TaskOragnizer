let taskTextCapture = '';

function pull(name, category, location) {
  if(location==='Monday')
  {
    MondayBin.remove(name, category);
  } else if(location==='Tuesday') {
    TuesdayBin.remove(name, category);
  } else if(location==='Wednesday') {
    WednesdayBin.remove(name, category);
  } else if(location==='Thursday') {
    ThursdayBin.remove(name, category);
  } else {
    FridayBin.remove(name, category);
  }
  const temp = [name, category];
  const temp2= new BinTask(temp);
  Bucket.bucket=Bucket.bucket.concat(temp2);
  Bucket.renderBucket('Task-Bin');
}

function push(name, category, location) {
  Bucket.remove(name, category);
  //TODO - create function to add button to day bin
  if(location==='Monday')
  {
    MondayBin.pushTask(name, category, location);
  } else if(location==='Tuesday') {
    TuesdayBin.pushTask(name, category, location);
  } else if(location==='Wednesday') {
    WednesdayBin.pushTask(name, category, location);
  } else if(location==='Thursday') {
    ThursdayBin.pushTask(name, category, location);
  } else {
    FridayBin.pushTask(name, category, location);
  }
}

function createBinTask() {
  let deets = captureText();
  if(deets === null) {
  return null;
  }
  var newTask = new BinTask(deets);
  return newTask;
}

function captureText() {
  taskTextCapture = document.getElementById('task-input').value;
    if (!taskTextCapture.includes('/')) {
      document.getElementById('task-input').value = 'Invalid Entry';
      return null;
    }
  const taskDetails = taskTextCapture.split('/');
  if(taskDetails[1] === 'design' || taskDetails[1] === 'outreach' || taskDetails[1] === 'operations') {
    document.getElementById('task-input').value = '';
    return taskDetails;
  } else {
    document.getElementById('task-input').value = 'Invalid Entry';
    return null;
  }

}

class BinTask {
  constructor(arr) {
    let props = arr;
    this.taskName = props[0];
    this.category = props[1];
  }
  getName() {
    return this.taskName;
  }
  getCategory() {
    return this.category;
  }
}

class dayButton {
  constructor(name, category, location) {
    this.name=name;
    this.category=category;
    this.location=location;
    this.visible=false;
    this.butt=document.createElement('button');
    this.complete=document.createElement('button');
    this.return=document.createElement('button');

    this.complete.innerHTML = 'Complete';
    this.return.innerHTML = 'Return';

    this.complete.style.display = 'none';
    this.return.style.display = 'none';

    /* code block here for other button functions */
    this.complete.onclick = () => {
      if(this.location==='Monday') {
        MondayBin.remove(this.name, this.category);
      } else if(this.location==='Tuesday') {
        TuesdayBin.remove(this.name, this.category);
      } else if(this.location==='Wednesday') {
        WednesdayBin.remove(this.name, this.category);
      } else if(this.location==="Thursday") {
        ThursdayBin.remove(this.name, this.category);
      } else {
        FridayBin.remove(this.name, this.category);
      }

    };
    this.return.onclick = () => {
      pull(this.name, this.category, this.location);
    };
    /* end inner button code block */

    this.butt.innerHTML=this.name;
    if(this.category==='operations') {
      this.butt.style.backgroundColor = 'lightblue';
    } else if(this.category==='outreach') {
      this.butt.style.backgroundColor = 'pink'
    } else if(this.category==='design') {
      this.butt.style.backgroundColor = 'lightgreen';
    }
    this.butt.className += 'task-button';

    this.butt.appendChild(this.complete);
    this.butt.appendChild(this.return);
    this.butt.onclick = () => {
      if(!this.visible){
        this.butt.style.height = '70px';
        this.complete.style.display = 'inline-block';
        this.return.style.display = 'inline-block';
        this.visible=true;
      } else {
        this.butt.style.height = '50px';
        this.complete.style.display = 'none';
        this.return.style.display = 'none';
        this.visible=false;
      }
    };
  }
  getButton() {
  return this.butt;
  }
  getName(){
    return this.name
  }
  getCategory() {
    return this.category;
  }
}

class taskButton {
 constructor(name, category) {
   this.visible=false;
   this.name=name;
   this.category=category;
   this.butt=document.createElement('button');
   this.monButt=document.createElement('button');
   this.tueButt=document.createElement('button');
   this.wedButt=document.createElement('button');
   this.thurButt=document.createElement('button');
   this.friButt=document.createElement('button');

   this.monButt.innerHTML = 'Monday';
   this.tueButt.innerHTML = 'Tuesday'
   this.wedButt.innerHTML = 'Wednesday'
   this.thurButt.innerHTML = 'Thursday';
   this.friButt.innerHTML = 'Friday';

   this.monButt.style.display = 'none';
   this.tueButt.style.display = 'none';
   this.wedButt.style.display = 'none';
   this.thurButt.style.display = 'none';
   this.friButt.style.display = 'none';

   this.monButt.onclick = () => {
     push(this.name, this.category, 'Monday');
   };
   this.tueButt.onclick = () => {
     push(this.name, this.category, 'Tuesday');
   };
   this.wedButt.onclick = () => {
     push(this.name, this.category, 'Wednesday');
   };
   this.thurButt.onclick = () => {
     push(this.name, this.category, 'Thursday');
   };
   this.friButt.onclick = () => {
     push(this.name, this.category, 'Friday');
   };

   this.butt.innerHTML=this.name;
   if(this.category==='operations') {
     this.butt.style.backgroundColor = 'lightblue';
   } else if(this.category==='outreach') {
     this.butt.style.backgroundColor = 'pink'
   } else if(this.category==='design') {
     this.butt.style.backgroundColor = 'lightgreen';
   }
   this.butt.className += 'task-button';

   this.butt.appendChild(this.monButt);
   this.butt.appendChild(this.tueButt);
   this.butt.appendChild(this.wedButt);
   this.butt.appendChild(this.thurButt);
   this.butt.appendChild(this.friButt);

   this.butt.onclick = () => {
     if(!this.visible){
       this.butt.style.height = '130px';
       this.monButt.style.display = 'inline-block';
       this.tueButt.style.display = 'inline-block';
       this.wedButt.style.display = 'inline-block';
       this.thurButt.style.display = 'inline-block';
       this.friButt.style.display = 'inline-block';
       this.visible=true;
     } else {
       this.butt.style.height = '50px';
       this.monButt.style.display = 'none';
       this.tueButt.style.display = 'none';
       this.wedButt.style.display = 'none';
       this.thurButt.style.display = 'none';
       this.friButt.style.display = 'none';
       this.visible=false;
     }

   };
 }
 getButton() {
 return this.butt;
 }
 getName(){
   return this.name
 }
 getCategory() {
   return this.category;
 }
}

class TaskBin{
  constructor(location) {
    this.bucket = [];
    this.location = location;
  }
  renderBucket(locationP) {
    const loc=locationP;
    while(document.getElementById(this.location).firstChild) {
     document.getElementById(this.location).removeChild(document.getElementById(this.location).firstChild);
    }
    this.bucket.forEach(element => {
      let but;
      if(this.location==='Task-Bin') {
        but = new taskButton(element.getName(), element.getCategory());
      } else {
        but = new dayButton(element.getName(), element.getCategory(), loc);
      }

      //here is where task button functionality is written
      document.getElementById(this.location).appendChild(but.getButton());
    });
  }
  addTask() {
    const temp = createBinTask();
     if (temp===null) {
      return null;
    }
    this.bucket = this.bucket.concat(temp);
    this.renderBucket('Task-Bin');
  }
  pushTask(name, category, location) {
    const temp = [name, category];
    const temp2 = new BinTask(temp);
    this.bucket = this.bucket.concat(temp2);
    this.renderBucket(location);
  }
  remove(name, category) {
    const temp1 = [name, category];
    const temp2 = new BinTask(temp1);
    this.bucket.forEach(element => {
      if(element.getName()===temp2.getName()&&element.getCategory()===temp2.getCategory()) {
        const i = this.bucket.indexOf(element);
        this.bucket.splice(i, 1);
      }
    });
    this.renderBucket(this.location);
  }
}

var Bucket = new TaskBin('Task-Bin');
var MondayBin = new TaskBin('Monday');
var TuesdayBin = new TaskBin('Tuesday');
var WednesdayBin = new TaskBin('Wednesday');
var ThursdayBin = new TaskBin('Thursday');
var FridayBin = new TaskBin('Friday');

function dump() {
Bucket.addTask();
}
