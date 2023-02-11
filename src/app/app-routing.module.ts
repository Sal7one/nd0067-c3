import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductListComponent } from './pages/prodcuts/product-list.component';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  // {path: 'prodcuts', component: ProductListComponent},
  // {path: 'prodcuts/:id', component: ProductDeatilsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
