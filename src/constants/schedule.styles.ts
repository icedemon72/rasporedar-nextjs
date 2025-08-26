import { ScheduleStyles } from "@/types/global";

export const scheduleCustomStyles: ScheduleStyles = {
	default: {
		background: 'bg-white',
		titleBackground: 'bg-gray-300',
		rowStyle: 'odd:bg-gray-200 even:bg-white',
		colStyle: 'border-r border-y last:border-r-0 border-black',
		clockCol: 'border-y border-r border-black bg-gray-300'
	},
	ice: {
		background: 'bg-blue-100',
		titleBackground: 'bg-gradient-to-r from-[#71A6D1] to-blue-300',
		rowStyle: 'odd:bg-blue-50 even:bg-blue-100',
		colStyle: 'border-r border-y last:border-r-0 border-blue-300',
		clockCol: 'border-y border-r border-blue-300 bg-blue-200'
	},
	block: {
		// do me...
	},
	pmf: {
		background: 'font-bold bg-[#4472c4]',
		titleBackground: 'border-b-2 border-black bg-[#4472c4]',
		rowStyle: 'even:bg-[#d8d8d8] odd:bg-white',
		colStyle: 'border-r border-y last:border-r-0 border-[#4a4f59]',
		clockCol: 'bg-[#4472c4]',
	},
	raven: {
		background: 'bg-black text-white',
		titleBackground: 'bg-black text-white',
		rowStyle: 'bg-stone-900 text-white',
		colStyle: 'border-r border-y last:border-r-0 border-black',
		clockCol: 'bg-black'
	},
	anthea: {
		background: 'bg-[#c336c3] font-bold uppercase text-[#fdf5fe] text-white',
		titleBackground: 'bg-[#e16ee4] uppercase',
		colStyle: 'even:bg-[#fbeafd] odd:bg-[#f6d4fa]',
		clockCol: 'bg-[#e16ee4]',
	}
}