// import moment from 'moment';

const kafici = [
    {
        id: '1',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Vinyl',
        logo: 'vinyl.png',
        totalSpots: 32,
        freeSpots: 8,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            images: '',
            workingHours: [
                '9:00 - 23:30',
                '9:00 - 23:30',
                '9:00 - 23:30',
                '9:00 - 23:30',
                '9:00 - 23:30',
                '9:00 - 23:30',
                '9:00 - 23:30',
            ],
            location: 'https://www.google.com/maps/place/Vinyl+Cafe/@43.3179874,21.8948292,15z/data=!4m5!3m4!1s0x0:0xa52fd515620420f!8m2!3d43.3179874!4d21.8948292?hl=sr',
            menu: '',
            address: 'Majakovskog bb 13/4',
            phoneNumber: '(064) 776-332',
            totalClaps: 135,
            numberOfGrades: 38,
            userAplauza: 0,
            music: 'Pop',
            volume: 3
        }
    },
    {
        id: '2',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Distrikt',
        logo: 'distrikt.png',
        totalSpots: 68,
        freeSpots: 7,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            images: '',
            workingHours: [
                '08:00 - 04:15',
                '08:00 - 04:15',
                '08:00 - 04:15',
                '08:00 - 04:15',
                '08:00 - 04:15',
                '08:00 - 04:15',
                '08:00 - 04:15',
            ],
            location: 'https://www.google.com/maps/place/Square+Cafe/@43.3203283,21.917684,15z/data=!4m5!3m4!1s0x0:0xa63c72132475dc46!8m2!3d43.3203283!4d21.917684?hl=sr',
            menu: '',
            address: 'Majakovskog bb 13/4',
            phoneNumber: '(064) 776-332',
            totalClaps: 148,
            numberOfGrades: 38,
            music: 'Pop',
            volume: 3
        }
    },
    {
        id: '3',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Dnevna soba',
        logo: 'dnevnaSoba.jpg',
        totalSpots: 42,
        freeSpots: 0,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            images: '',
            workingHours: [
                '12:50 - 00:10',
                '12:50 - 00:10',
                '12:50 - 00:10',
                '12:50 - 17:10',
                '12:50 - 17:10',
                '12:50 - 00:10',
                '12:50 - 00:10',
            ],
            location: 'https://www.google.com/maps/place/Caffe+bar+Dnevna+soba/@43.3196389,21.896984,15z/data=!4m5!3m4!1s0x0:0xf0256956dfa8b74d!8m2!3d43.3196389!4d21.896984?hl=sr',
            menu: '',
            address: 'Majakovskog bb 13/4',
            phoneNumber: '(064) 776-332',
            totalClaps: 156,
            numberOfGrades: 38,
            music: 'Pop',
            volume: 2
        }
    },
    {
        id: '4',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Durango Caffe',
        logo: '',
        totalSpots: 90,
        freeSpots: 10,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Jedini kafić u gradu gde možete maziti naše kućne ljubimce dok ispijate kafu sa svojim društvom',
            images: '',
            workingHours: [
                '05:30 - 05:31',
                '05:30 - 05:31',
                '05:30 - 05:31',
                '05:30 - 05:31',
                '05:30 - 05:31',
                '05:30 - 05:31',
                '05:30 - 05:31',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Majakovskog bb 13/4',
            phoneNumber: '(064) 776-332',
            totalClaps: 190,
            numberOfGrades: 38,
            music: 'Pop',
            volume: 2
        }
    },
    {
        id: '6',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Biro Kafeterija',
        logo: 'biro.png',
        totalSpots: 32,
        freeSpots: 10,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Pazite se, mi volimo da vas slikamo noću!',
            images: '',
            workingHours: [
                '09:30 - 04:50',
                '09:30 - 04:50',
                '09:30 - 04:50',
                '09:30 - 04:50',
                '09:30 - 04:50',
                '09:30 - 04:50',
                '09:30 - 04:50',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Centar grada',
            phoneNumber: '(064) 776-332',
            totalClaps: 563,
            numberOfGrades: 194,
            music: 'Pop',
            volume: 3
        }
    },
    {
        id: '7',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Okrug caffe',
        logo: 'okrug.jpg',
        // preporuka: true,
        totalSpots: 20,
        freeSpots: 0,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Kod nas uvek možete da čitate knjige iz trilogija "Gospodar prstenova" i "Hobiti"',
            images: '',
            workingHours: [
                '06:30 - 01:45',
                '06:30 - 01:45',
                '06:30 - 01:45',
                '06:30 - 01:45',
                '06:30 - 01:45',
                '06:30 - 01:45',
                '06:30 - 01:45',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Romanijska 17, Niš 18000',
            phoneNumber: '(064) 776-332',
            totalClaps: 287,
            numberOfGrades: 62,
            music: 'Pop',
            volume: 1
        }
    },
    {
        id: '8',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Zrnce caffe',
        logo: 'zrnce.png',
        totalSpots: 58,
        freeSpots: 10,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'I ako smo zrnce mi nismo mali!',
            images: '',
            workingHours: [
                '07:25 - 03:46',
                '07:25 - 03:46',
                '07:25 - 03:46',
                '07:25 - 03:46',
                '07:25 - 03:46',
                '07:25 - 03:46',
                '07:25 - 03:46',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Nepoznata address',
            phoneNumber: '(064) 776-332',
            totalClaps: 33,
            numberOfGrades: 10,
            music: 'Pop',
            volume: 1
        }
    },
    {
        id: '9',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Sailor',
        logo: 'sailor.png',
        totalSpots: 30,
        freeSpots: 10,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Plovimo na talasima vaše kafe',
            images: '',
            workingHours: [
                '07:45 - 01:00',
                '07:45 - 01:00',
                '07:45 - 01:00',
                '07:45 - 01:00',
                '07:45 - 01:00',
                '07:45 - 01:00',
                '07:45 - 01:00',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Nepoznata adresa',
            phoneNumber: '(064) 776-332',
            totalClaps: 743,
            numberOfGrades: 225,
            music: 'Rock',
            volume: 1
        }
    },
    {
        id: '5',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'caffe',
        title: 'Caffe Zebrano',
        logo: 'zebrano.png',
        totalSpots: 45,
        freeSpots: 0,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Mazimo zebre!',
            images: '',
            workingHours: [
                '07:55 - 02:00',
                '07:55 - 02:00',
                '07:55 - 02:00',
                '07:55 - 02:00',
                '07:55 - 02:00',
                '07:55 - 02:00',
                '07:55 - 02:00',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Troška',
            phoneNumber: '(064) 776-332',
            totalClaps: 1892,
            numberOfGrades: 712,
            music: 'Punk',
            volume: 2
        }
    },
    {
        id: '10',
        location: {
            id: 1,
            title: 'Niš'
        },
        type: 'billiard',
        title: 'Buffalo',
        logo: 'buffalo.jpg',
        totalSpots: 12,
        freeSpots: 3,
        spotsUpdatedAt: 1589897781000,
        reservations: [],
        details: {
            description: 'Samo ćemo reći: BILIJAR!',
            images: '',
            workingHours: [
                '07:55 - 03:00',
                '07:55 - 04:00',
                '07:55 - 04:00',
                '07:55 - 04:00',
                '07:55 - 04:00',
                '07:55 - 04:00',
                '07:55 - 04:00',
            ],
            location: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            menu: '',
            address: 'Prešernova 6',
            phoneNumber: '(064) 9839569',
            totalClaps: 1892,
            numberOfGrades: 712,
            music: 'Sve',
            volume: 1
        }
    }
]

export default kafici;
