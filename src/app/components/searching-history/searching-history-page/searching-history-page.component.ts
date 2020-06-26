import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/api/history.service';

@Component({
    selector: 'app-searching-history-page',
    templateUrl: 'searching-history-page.component.html',
    styleUrls: ['searching-history-page.component.css']
})
export class SearchingHistoryPageComponent {
    history: History[];
    constructor(private historyService: HistoryService) {
        this.historyService.getAll(this.fullFillHistory.bind(this));
    }

    fullFillHistory(history: History[]) {
        this.history = [...history];
    }
}
