import { AcessoComponent } from "./acesso/acesso.component";
import { HomeComponent } from "./home/home.component";
import { Routes} from "@angular/router";


export const ROUTES:Routes = [
    {path : '', component: AcessoComponent},
    {path : 'home', component: HomeComponent},
]