import {Component, OnInit} from '@angular/core';
import {StructureService} from '../structure.service';
import {Entry} from '../model/entry';
import {Structure} from '../model/structure';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.css']
})
export class StructureViewerComponent implements OnInit {

  resourceTypes = [
    {'name': 'episodeofcare', 'label': 'EpisodeOfCare'},
    {'name': 'condition', 'label': 'Condition'},
    {'name': 'ColumnaHealthIssue', 'label': 'ColumnaHealthIssue'},
    {'name': 'ColumnaEpisodeOfCare', 'label': 'ColumnaEpisodeOfCare'}
  ];
  selectedResource: string;
  structure: Structure;
  hideUnused = true;
  baseResource: string;
  private $resource: Observable<Structure>;

  constructor(private route: ActivatedRoute, private router: Router, private structureService: StructureService) {
  }

  ngOnInit() {
    this.$resource = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.structureService.getStructure(params.get('resource'));
      }));
    this.$resource.subscribe(value => {
      this.baseResource = JSON.stringify(value);
      this.structure = new Structure();
      this.structure.id = value.id;
      let res: any;
      if (value.snapshot) {
        res = value.snapshot;
      }
      if (value.differential) {
        res = value.differential;
      }
      if (res.element) {
        this.structure.entries = [];
        for (let i = 0; i < res.element.length; i++) {
          const entry: Entry = new Entry();
          const item = res.element[i];
          entry.name = item.sliceName;
          entry.path = item.path;
          entry.level = this.computeLevel(item.path);
          entry.isSummary = item.isSummary;
          entry.isModifier = item.isModifier;
          entry.min = item.min;
          entry.max = item.max;
          if (item.code) {
            entry.code = item.code;
          }
          if (item.type) {
            const typeElement = item.type[0];
            if (typeElement.code === 'Extension') {
              entry.type_name = this.stripUrl(typeElement.profile[0]);
              entry.type = 'Extension';
            } else if (typeElement.code === 'Reference') {
              entry.type = 'Reference';
              if (typeElement.profile) {
                entry.type_name = this.stripUrl(typeElement.profile[0]);
              } else if (typeElement.targetProfile) {
                entry.type_name = this.stripUrl(typeElement.targetProfile[0]);
              }
            } else {
              entry.type = this.checkType(typeElement.code);
              // entry.type = 'data_type';
              entry.type_name = typeElement.code;

            }
          }
          entry.description = item.definition;
          this.structure.entries.push(entry);
        }
      }
      // entry.name
    });
  }

  stripUrl(referenceUrl: string) {
    if (!referenceUrl) {
      return '';
    }
    return referenceUrl.split('/').pop();
  }

  computeLevel(path: string): number {
    const match = path.match(/\./g);
    const length1 = (match || []).length;
    return length1;
  }

  chooseResource() {
    this.router.navigate(['StructureDefinition', this.selectedResource]);
    // this.structureService.getStructure(this.selectedResource).subscribe(value => {
    //   this.structure = new Structure();
    //   this.structure.id = value.id;
    //   if (value.snapshot) {
    //     if (value.snapshot.element) {
    //       this.structure.entries = [];
    //       for (let i = 0; i < value.snapshot.element.length; i++) {
    //         const entry: Entry = new Entry();
    //         const item = value.snapshot.element[i];
    //         entry.name = item.sliceName;
    //         entry.path = item.path;
    //         entry.level = this.computeLevel(item.path);
    //         entry.isSummary = item.isSummary;
    //         entry.isModifier = item.isModifier;
    //         entry.min = item.min;
    //         entry.max = item.max;
    //         if (item.code) {
    //           entry.code = item.code;
    //         }
    //         if (item.type) {
    //           if (item.type[0].code === 'Extension') {
    //             entry.extension = this.stripUrl(item.type[0].profile[0]);
    //           } else if (item.type[0].code === 'Reference') {
    //             entry.reference = this.stripUrl(item.type[0].profile[0]);
    //           } else {
    //             entry.type = item.type[0].code;
    //           }
    //         }
    //         entry.description = item.definition;
    //         this.structure.entries.push(entry);
    //       }
    //     }
    //   }
    //   // entry.name
    // });
  }

  private checkType(code: string) {
    switch (code) {
      case 'boolean':
      case'integer':
      case 'string':
      case 'decimal':
      case 'uri':
      case 'base64Binary':
      case 'instant':
      case 'date':
      case 'dateTime':
      case 'time':
      case 'code':
      case 'oid':
      case 'id':
      case 'markdown':
      case 'unsignedInt':
      case 'positiveInt':
        return 'primitive_data_type';
        break;
      default:
        return 'data_type';
    }
    return '';
  }
}

/**
 <div *ngFor="let elem of element?.snapshot?.element; let even = even; let odd = odd" class="userList" [ngClass]="{odd: odd, even: even}">

 <div *ngIf="elem.path.endsWith('extension')">{{elem.sliceName}}</div>
 <div *ngIf="!elem.path.endsWith('extension')">{{elem.path}}</div>
 <div>
 <span *ngIf="elem.isModifier">?!</span>
 <span *ngIf="elem.isSummary">Σ</span>
 </div>
 <div>{{elem.min}}..{{elem.max}}</div>
 <div *ngIf="elem.type">{{elem.type[0].code}}
 <span *ngIf="elem.type[0].code === 'Reference'">({{stripUrl(elem.type[0].targetProfile)}})</span>
 <!--<span *ngIf="elem.type[0].code === 'Extension'">({{stripUrl(elem.type[0].profile)}})</span>-->
 </div>
 <div *ngIf="!elem.type"></div>
 <div>{{elem.definition}}</div>
 </div>
 **/
