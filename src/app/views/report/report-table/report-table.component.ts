import { Component, OnInit, Input } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit {

  @Input() headerList: any;
  @Input() rootEntity: any;
  @Input() headerShower: boolean[];
  @Input() pagedItems: any;

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.filterable .btn-filter').click(function(){
          const $panel = $(this).parents('.filterable'),
          $filters = $panel.find('.filters input'),
          $tbody = $panel.find('.table tbody');
          if ($filters.prop('disabled') === true) {
              $filters.prop('disabled', false);
              $filters.first().focus();
          } else {
              $filters.val('').prop('disabled', true);
              $tbody.find('.no-result').remove();
              $tbody.find('tr').show();
          }
      });

      $('.filterable .filters input').keyup(function(e){
          /* Ignore tab key */
          const code = e.keyCode || e.which;
          if (code === '9') { return; }
          /* Useful DOM data and selectors */
          const $input = $(this),
          inputContent = $input.val().toLowerCase(),
          $panel = $input.parents('.filterable'),
          column = $panel.find('.filters th').index($input.parents('th')),
          $table = $panel.find('.table'),
          $rows = $table.find('tbody tr');
          /* Dirtiest filter function ever ;) */
          const $filteredRows = $rows.filter(function(){
              const value = $(this).find('td').eq(column).text().toLowerCase();
              return value.indexOf(inputContent) === -1;
          });
          /* Clean previous no-result if exist */
          $table.find('tbody .no-result').remove();
          /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
          $rows.show();
          $filteredRows.hide();
          /* Prepend no-result row if all rows are filtered */
          if ($filteredRows.length === $rows.length) {
              // tslint:disable-next-line:max-line-length
              $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
          }
      });
  });
  }

  public loadData(currentTable, headerList, headerShower) {
    this.rootEntity = currentTable;
    this.headerList = headerList;
    this.headerShower = headerShower;
  }
}
