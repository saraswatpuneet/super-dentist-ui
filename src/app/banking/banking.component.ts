import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {
  transactions = [
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
    { date: Date.now(), description: 'Teenage mutant ninja turtles', assignedTo: 'Web Hosting', amount: '$251.17', balance: '$72,345,861' },
  ];
  pageSize = 20;
  displayedColumns = ['date', 'description', 'assignedTo', 'amount', 'balance'];

  constructor() { }

  ngOnInit(): void {
  }

}
