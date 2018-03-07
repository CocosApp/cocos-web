declare var moment;

interface Date {
    addDays(days: number): Date;
    addHours(hours: number): Date;
    daysFrom(date: Date): number;
    lastWeekDaysLabels(): string[];
    toLocaleDate(separator?: string): string;
    toLocaleDateYearFirst(separator?: string): string;
}

interface DateConstructor{

    fromString : (stringifiedDate: string) => Date
    
}


Date.prototype.addDays = function (days: number): Date {
    if (!days) return new Date(this.getTime());
    let date = new Date(this.getTime());
    date.setDate(date.getDate() + days);
    
    return date;
};

Date.prototype.addHours = function(hours: number) { 
    let date = new Date(this.getTime());   
    date.setTime(date.getTime() + (hours*60*60*1000)); 
    return this;   
}

Date.prototype.daysFrom = function(date: Date){
    let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    let firstDate = this;
    let secondDate = date;

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
}

Date.prototype.lastWeekDaysLabels = function(){
    let weekDaysLabels = moment.weekdays(true);
    let weekDay: number = this.getDay();
    let labels: string[] = [];
    labels = labels.concat( weekDaysLabels.slice( (weekDay) % 7  ) );
    labels = labels.concat( weekDaysLabels.slice( 0, (weekDay) % 7  ) );
    return labels;
}



Date.fromString = function(string: string){
    
    if(!string) return undefined;

    let dateParts = string.split('-');

    return new Date(parseInt(dateParts[0]),parseInt(dateParts[1])-1,parseInt(dateParts[2].substring(0,2)));

}


Date.prototype.toLocaleDate = function(separator?: string):string{
    separator = separator || '-';
    let year = this.getFullYear();
    let month = this.getMonth()+1;
    let day = this.getDate();
    let yearStr = year.toString();
    let monthStr = month<10? '0'+month.toString() : month.toString();
    let dayStr = day<10? '0'+day.toString() : day.toString();
    return `${dayStr}${separator}${monthStr}${separator}${yearStr}`;
}


Date.prototype.toLocaleDateYearFirst = function(separator?: string):string{
    separator = separator || '-';
    let year = this.getFullYear();
    let month = this.getMonth()+1;
    let day = this.getDate();
    let yearStr = year.toString();
    let monthStr = month<10? '0'+month.toString() : month.toString();
    let dayStr = day<10? '0'+day.toString() : day.toString();
    return `${yearStr}${separator}${monthStr}${separator}${dayStr}`;
}