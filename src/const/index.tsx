export const STATE_LIST = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Wilayah Persekutuan'
]

export interface Location {
    label: string;
    value: string;
}

export interface LocationList {
    [key: string]: Location[];
}

export const LOCATION_LIST: LocationList = {
    'Johor': [
        { label: 'Batu Pahat', value: 'jhr-0' },
        { label: 'Gemas', value: 'jhr-1' },
        { label: 'Johor Bahru', value: 'jhr-2' },
        { label: 'Kluang', value: 'jhr-3' },
        { label: 'Kota Tinggi', value: 'jhr-4' },
        { label: 'Mersing', value: 'jhr-5' },
        { label: 'Muar', value: 'jhr-6' },
        { label: 'Pemanggil', value: 'jhr-7' },
        { label: 'Pontian', value: 'jhr-8' },
        { label: 'Pulau Aur', value: 'jhr-9' },
        { label: 'Segamat', value: 'jhr-10' },
    ],
    'Kedah': [
        { label: 'Baling', value: 'kdh-0' },
        { label: 'Bandar Baharu', value: 'kdh-1' },
        { label: 'Kota Setar', value: 'kdh-2' },
        { label: 'Kuala Muda', value: 'kdh-3' },
        { label: 'Kubang Pasu', value: 'kdh-4' },
        { label: 'Kulim', value: 'kdh-5' },
        { label: 'Langkawi', value: 'kdh-6' },
        { label: 'Padang Terap', value: 'kdh-7' },
        { label: 'Pendang', value: 'kdh-8' },
        { label: 'Pokok Sena', value: 'kdh-9' },
        { label: 'Puncak Gunung Jerai', value: 'kdh-10' },
        { label: 'Sik', value: 'kdh-11' },
        { label: 'Yan', value: 'kdh-12' },
    ],
    'Kelantan': [
        { label: 'Bachok', value: 'ktn-0' },
        // { label: 'Bertam', value: 'ktn-1' },
        // { label: 'Jeli', value: 'ktn-2' },
        { label: 'Kota Bharu', value: 'ktn-3' },
        { label: 'Kuala Krai', value: 'ktn-4' },
        { label: 'Machang', value: 'ktn-5' },
        { label: 'Mukim Chiku', value: 'ktn-6' },
        // { label: 'Mukim Galas', value: 'ktn-7' },
        { label: 'Pasir Mas', value: 'ktn-8' },
        { label: 'Pasir Puteh', value: 'ktn-9' },
        { label: 'Tanah Merah', value: 'ktn-10' },
        { label: 'Tumpat', value: 'ktn-11' },
    ],
    'Melaka': [
        { label: 'Alor Gajah', value: 'mlk-0' },
        { label: 'Bandar Melaka', value: 'mlk-1' },
        { label: 'Jasin', value: 'mlk-2' },
        { label: 'Masjid Tanah', value: 'mlk-3' },
        { label: 'Merlimau', value: 'mlk-4' },
        { label: 'Nyalas', value: 'mlk-5' },
    ],
    'Negeri Sembilan': [
        { label: 'Jelebu', value: 'ngs-0' },
        { label: 'Jempol', value: 'ngs-1' },
        { label: 'Kuala Pilah', value: 'ngs-2' },
        { label: 'Port Dickson', value: 'ngs-3' },
        { label: 'Rembau', value: 'ngs-4' },
        { label: 'Seremban', value: 'ngs-5' },
        { label: 'Tampin', value: 'ngs-6' },
    ],
    'Pahang': [
        { label: 'Bentong', value: 'phg-0' },
        { label: 'Bera', value: 'phg-1' },
        { label: 'Bukit Fraser', value: 'phg-2' },
        { label: 'Cameron Highland', value: 'phg-3' },
        { label: 'Chenor', value: 'phg-4' },
        { label: 'Genting Highlands', value: 'phg-5' },
        { label: 'Jerantut', value: 'phg-6' },
        { label: 'Kuala Lipis', value: 'phg-7' },
        { label: 'Kuantan', value: 'phg-8' },
        { label: 'Maran', value: 'phg-9' },
        { label: 'Muadzam Shah', value: 'phg-10' },
        { label: 'Pekan', value: 'phg-11' },
        { label: 'Pulau Tioman', value: 'phg-12' },
        { label: 'Raub', value: 'phg-13' },
        { label: 'Rompin', value: 'phg-14' },
        { label: 'Temerloh', value: 'phg-15' },
    ],
    'Perak': [
        { label: 'Bagan Datoh', value: 'prk-0' },
        { label: 'Bagan Serai', value: 'prk-1' },
        { label: 'Batu Gajah', value: 'prk-2' },
        { label: 'Belum', value: 'prk-3' },
        { label: 'Beruas', value: 'prk-4' },
        { label: 'Bukit Larut', value: 'prk-5' },
        { label: 'Grik', value: 'prk-6' },
        { label: 'Ipoh', value: 'prk-7' },
        { label: 'Kampar', value: 'prk-8' },
        { label: 'Kampung Gajah', value: 'prk-9' },
        { label: 'Kuala Kangsar', value: 'prk-10' },
        { label: 'Lenggong', value: 'prk-11' },
        { label: 'Lumut', value: 'prk-12' },
        { label: 'Parit', value: 'prk-13' },
        { label: 'Parit Buntar', value: 'prk-14' },
        { label: 'Pengkalan Hulu', value: 'prk-15' },
        { label: 'Pulau Pangkor', value: 'prk-16' },
        { label: 'Selama', value: 'prk-17' },
        { label: 'Setiawan', value: 'prk-18' },
        { label: 'Slim River', value: 'prk-19' },
        { label: 'Sri Iskandar', value: 'prk-20' },
        { label: 'Sungai Siput', value: 'prk-21' },
        { label: 'Taiping', value: 'prk-22' },
        { label: 'Tanjung Malim', value: 'prk-23' },
        { label: 'Tapah', value: 'prk-24' },
        { label: 'Teluk Intan', value: 'prk-25' },
        { label: 'Temengor', value: 'prk-26' },
    ],
    'Perlis': [
        { label: 'Arau', value: 'pls-0' },
        { label: 'Kangar', value: 'pls-1' },
        { label: 'Padang Besar', value: 'pls-2' },
    ],
    'Pulau Pinang': [
        { label: 'Pulau Pinang', value: 'png-0' },
    ],
    'Sabah': [
        { label: 'Balong', value: 'sbh-0' },
        { label: 'Bandar Bukit Garam', value: 'sbh-1' },
        { label: 'Beaufort', value: 'sbh-2' },
        { label: 'Beluran', value: 'sbh-3' },
        { label: 'Gunung Kinabalu', value: 'sbh-4' },
        { label: 'Kalabakan', value: 'sbh-5' },
        { label: 'Keningau', value: 'sbh-6' },
        { label: 'Kota Belud', value: 'sbh-7' },
        { label: 'Kota Kinabalu', value: 'sbh-8' },
        { label: 'Kota Marudu', value: 'sbh-9' },
        { label: 'Kuala Penyu', value: 'sbh-10' },
        { label: 'Kuamut', value: 'sbh-11' },
        { label: 'Kudat', value: 'sbh-12' },
        { label: 'Kunak', value: 'sbh-13' },
        { label: 'Lahat Datu', value: 'sbh-14' },
        { label: 'Long Pa Sia', value: 'sbh-15' },
        { label: 'Membakut', value: 'sbh-16' },
        { label: 'Merotai', value: 'sbh-17' },
        { label: 'Nabawan', value: 'sbh-18' },
        { label: 'Papar', value: 'sbh-19' },
        { label: 'Penampang', value: 'sbh-20' },
        { label: 'Pensiangan', value: 'sbh-21' },
        { label: 'Pinangah', value: 'sbh-22' },
        { label: 'Pitas', value: 'sbh-23' },
        { label: 'Pulau Banggi', value: 'sbh-24' },
        { label: 'Ranau', value: 'sbh-25' },
        { label: 'Sahabat', value: 'sbh-26' },
        { label: 'Sandakan', value: 'sbh-27' },
        { label: 'Semawang', value: 'sbh-28' },
        { label: 'Semporna', value: 'sbh-29' },
        { label: 'Silabukan', value: 'sbh-30' },
        { label: 'Sipitang', value: 'sbh-31' },
        { label: 'Tambisan', value: 'sbh-32' },
        { label: 'Tambunan', value: 'sbh-33' },
        { label: 'Tawau', value: 'sbh-34' },
        { label: 'Telupit', value: 'sbh-35' },
        { label: 'Temanggong', value: 'sbh-36' },
        { label: 'Tenom', value: 'sbh-37' },
        { label: 'Terusan', value: 'sbh-38' },
        { label: 'Tuaran', value: 'sbh-39' },
        { label: 'Tungku', value: 'sbh-40' },
        { label: 'Weston', value: 'sbh-41' },
    ],
    'Selangor': [
        { label: 'Gombak', value: 'sgr-0' },
        { label: 'Hulu Langat', value: 'sgr-1' },
        { label: 'Hulu Selangor', value: 'sgr-2' },
        { label: 'Klang', value: 'sgr-3' },
        { label: 'Kuala Langat', value: 'sgr-4' },
        { label: 'Kuala Selangor', value: 'sgr-5' },
        { label: 'Petaling', value: 'sgr-6' },
        { label: 'Rawang', value: 'sgr-7' },
        { label: 'Sabak Bernam', value: 'sgr-8' },
        { label: 'Sepang', value: 'sgr-9' },
        { label: 'Shah Alam', value: 'sgr-10' },
    ],
    'Terengganu': [
        { label: 'Besut', value: 'trg-0' },
        { label: 'Dungun', value: 'trg-1' },
        { label: 'Hulu Terengganu', value: 'trg-2' },
        { label: 'Kemaman', value: 'trg-3' },
        { label: 'Kuala Terengganu', value: 'trg-4' },
        { label: 'Marang', value: 'trg-5' },
        { label: 'Setiu', value: 'trg-6' },
    ],
    'Wilayah Persekutuan': [
        { label: 'Kuala Lumpur', value: 'wlp-0' },
        { label: 'Labuan', value: 'wlp-1' },
        { label: 'Putrajaya', value: 'wlp-2' },
    ],
}

export const PRAYER_LABEL = ['Subuh', 'Syuruk', 'Zohor', 'Asar', 'Maghrib', 'Isyak']

export const DAY_LABEL = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu']

export const HIJRI_MONTH = ['Muharam', 'Safar', 'Rabiulawal', 'Rabiulakhir', 'Jamadilawal', 'Jamadilakhir', 'Rejab', 'Syaaban', 'Ramadan', 'Syawal', 'Zulkaedah', 'Zulhijah']
export const GREG_MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']