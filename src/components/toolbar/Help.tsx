'use client'
import useStore from "@/store"
import { HelpCircle } from "lucide-react"

const Help = () => {
  const toggle = useStore(state => state.toggleHelpModal)
  return (
    <span onClick={toggle} >
      <HelpCircle width={24} />
    </span>
  )
}

export default Help
