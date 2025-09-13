import { Schedule, ScheduleCreateOmit, ScheduleInstance, ScheduleInstanceData } from "@/types/data";
import { OptionType } from "@/types/global";

export const DEFAULT_DAYS =  ['Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak']

export const INITIAL_SCHEDULE: Omit<Schedule, ScheduleCreateOmit> & { rows: any } = {
  comment: '',
  data: [],
  days: DEFAULT_DAYS,
  department: '',
  frequency: '',
  groups: [],
  instances: [],
  institution: '',
  style: 'default',
  subtitle: '',
  systemType: '',
  title: '',
  validFrom: '',
  validUntil: '',
  rows: []
}

export const SCHEDULE_TYPES: OptionType[] = [
  {
    label: 'Školski',
    value: 'school'
  },
  {
    label: 'Fakultetski',
    value: 'faculty'
  }
]

export const SCHEDULE_STYLES: OptionType[] = [
	{ label: 'Podrazumevni', value: 'default' },
	{ label: 'Hladni', value: 'ice' },
	{ label: 'Kockasti', value: 'block' },
	{ label: 'Pemef', value: 'pmf' },
	{ label: 'Raven', value: 'raven' },
	{ label: 'Anthea', value: 'anthea' },
];

export const SCHEDULE_FREQUENCIES: OptionType[] = [
	{ value: '*', label: 'Uvek' },
	{ value: 'w2', label: 'Svake druge nedelje' },
	{ value: 'w3', label: 'Svake treće nedelje' },
	{ value: 'm1', label: 'Svakog meseca (pete nedelje)' },
	{ value: 'm2', label: 'Svaka dva meseca (desete nedelje)' },
];

export const GENERATE_EMPTY_ROW = (len: number) => ({
  data: Array(len).fill([]),
    defaultTimes: [
      {
        from: '',
        to: ''
      }
    ]
});

export const EMPTY_SCHEDULE_INSTANCE: ScheduleInstanceData = {
  subject: '',
  lecturer: '',
  from: '',
  to: '',
  location: ''
};

export const GENERATE_ROW_WITH_ONE_ITEM = (daysCount: number): ScheduleInstance => ({
  data: Array.from({ length: daysCount }, () => [ { ...EMPTY_SCHEDULE_INSTANCE } ]),
  defaultTimes: [{ from: '', to: '' }]
});