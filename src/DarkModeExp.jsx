import { ThemeProvider } from "./context/ThemeContext"
import DarkModeToggler from "./DarkModeToggler"

function DarkModeExp() {
  return (
    <>
      
<ThemeProvider>
<div className="bg-amber-100 dark:bg-amber-800">App</div>
<DarkModeToggler/>
</ThemeProvider>
    </>
  )
}

export default DarkModeExp



