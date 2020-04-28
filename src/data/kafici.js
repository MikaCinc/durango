const kafici = [
    {
        id: 1,
        title: 'Vinyl',
        logo: 'vinyl.png',
        brojMesta: 32,
        brojSlobodnihMesta: 10,
        rezervacija: [],
        details: {
            opis: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            slike: '',
            radnoVreme: '9:00 - 23:30',
            lokacija: 'https://www.google.com/maps/place/Vinyl+Cafe/@43.3179874,21.8948292,15z/data=!4m5!3m4!1s0x0:0xa52fd515620420f!8m2!3d43.3179874!4d21.8948292?hl=sr',
            meni: '',
            adresa: 'Majakovskog bb 13/4',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 135,
            brojOcena: 38,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 3
        }
    },
    {
        id: 2,
        title: 'Square',
        logo: 'Square.jpg',
        brojMesta: 68,
        brojSlobodnihMesta: 14,
        rezervacija: [],
        details: {
            opis: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            slike: '',
            radnoVreme: '18:00 - 04:15',
            lokacija: 'https://www.google.com/maps/place/Square+Cafe/@43.3203283,21.917684,15z/data=!4m5!3m4!1s0x0:0xa63c72132475dc46!8m2!3d43.3203283!4d21.917684?hl=sr',
            meni: '',
            adresa: 'Majakovskog bb 13/4',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 148,
            brojOcena: 38,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 3
        }
    },
    {
        id: 3,
        title: 'Dnevna soba',
        logo: 'dnevnaSoba.jpg',
        brojMesta: 42,
        brojSlobodnihMesta: 10,
        rezervacija: [],
        details: {
            opis: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            slike: '',
            radnoVreme: '06:50 - 00:10',
            lokacija: 'https://www.google.com/maps/place/Caffe+bar+Dnevna+soba/@43.3196389,21.896984,15z/data=!4m5!3m4!1s0x0:0xf0256956dfa8b74d!8m2!3d43.3196389!4d21.896984?hl=sr',
            meni: '',
            adresa: 'Majakovskog bb 13/4',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 156,
            brojOcena: 38,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 2
        }
    },
    {
        id: 4,
        title: 'Durango Caffe',
        logo: 'durangoCaffe.png',
        brojMesta: 90,
        brojSlobodnihMesta: 10,
        rezervacije: [],
        details: {
            opis: 'Jedini kafić u gradu gde možete maziti naše kućne ljubimce dok ispijate kafu sa svojim društvom',
            slike: '',
            radnoVreme: '05:30 - 05:31',
            lokacija: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            meni: '',
            adresa: 'Majakovskog bb 13/4',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 190,
            brojOcena: 38,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 2
        }
    },
    {
        id: 6,
        title: 'Niš noću',
        logo: 'nisNocu.jpg',
        brojMesta: 32,
        brojSlobodnihMesta: 25,
        rezervacije: [],
        details: {
            opis: 'Pazite se, mi volimo da vas slikamo noću!',
            slike: '',
            radnoVreme: '21:30 - 04:50',
            lokacija: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            meni: '',
            adresa: 'Centar grada',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 563,
            brojOcena: 194,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 3
        }
    },
    {
        id: 7,
        title: 'Okrug caffe',
        logo: 'okrug.jpg',
        brojMesta: 20,
        brojSlobodnihMesta: 3,
        rezervacije: [],
        details: {
            opis: 'Kod nas uvek možete da čitate knjige iz trilogija "Gospodar prstenova" i "Hobiti"',
            slike: '',
            radnoVreme: '6:30 - 01:45',
            lokacija: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            meni: '',
            adresa: 'Bulevar',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 287,
            brojOcena: 62,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 1
        }
    },
    {
        id: 8,
        title: 'Zrnce caffe',
        logo: 'zrnce.png',
        brojMesta: 58,
        brojSlobodnihMesta: 41,
        rezervacije: [],
        details: {
            opis: 'I ako smo zrnce mi nismo mali!',
            slike: '',
            radnoVreme: '7:25 - 03:46',
            lokacija: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            meni: '',
            adresa: 'Nepoznata adresa',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 33,
            brojOcena: 10,
            userAplauza: 0,
            muzika: 'Pop',
            volume: 1
        }
    },
    {
        id: 9,
        title: 'Sailor',
        logo: 'sailor.png',
        brojMesta: 30,
        brojSlobodnihMesta: 17,
        rezervacije: [],
        details: {
            opis: 'Plovimo na talasima vaše kafe',
            slike: '',
            radnoVreme: '7:45 - 01:00',
            lokacija: 'https://www.google.com/maps/place/%D0%A5%26%D0%9C/@43.3207141,21.8934617,17z/data=!3m1!4b1!4m5!3m4!1s0x4755b0b43dced8c7:0x9eb3a135c152d121!8m2!3d43.3207141!4d21.8956504?hl=sr',
            meni: '',
            adresa: 'Nepoznata adresa',
            brojTelefona: '(064) 776-332',
            ukupnoAplauza: 743,
            brojOcena: 225,
            userAplauza: 0,
            muzika: 'Rock',
            volume: 1
        }
    }
]

export default kafici;
