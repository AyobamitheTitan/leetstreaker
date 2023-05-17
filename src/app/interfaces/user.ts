import { FormControl } from "@angular/forms"

export interface User {
  username?:FormControl<string|null>
  password?:FormControl<string|null>
}
