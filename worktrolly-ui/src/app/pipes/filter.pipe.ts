import { Pipe, PipeTransform } from '@angular/core';
import { TasksId } from '../Interface/TasksInterface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasksCollection: TasksId[], searchAssignee: string, property: string): TasksId[] {
    if (searchAssignee === "") {
      return tasksCollection;
    }
    return tasksCollection.filter((task) => {
      return this.lowerCaseString(task[property]).indexOf(this.lowerCaseString(searchAssignee)) >= 0
    });
  }
  lowerCaseString(value: string) {
    return value.toLowerCase();
  }
}
