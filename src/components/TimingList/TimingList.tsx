import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { getTiming, getHijriDate } from '../../api';
import { PRAYER_LABEL, HIJRI_MONTH } from '../../const';
import './style.scss';

interface TimingListProps {
    config: {
        code: string;
        zone: string;
        state: string;
    };
    setShowLanding: (show: boolean) => void;
}

const TimingList: React.FC<TimingListProps> = ({ config, setShowLanding }) => {
    const { state, zone, code } = config;
    const [timingList, setTimingList] = useState<any[]>([]);
    const [hjDate, setHjDate] = useState('');
    const [filter, setFilter] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const currentDate = moment().format('D MMM YYYY');

    useEffect(() => {
        getTimingData();
        convertHijriDate();
    }, []);

    useEffect(() => {
        getTimingData();
    }, [filter]);

    const getTimingData = async () => {
        try {
            const res = await getTiming(code, filter);
            const { response, meta } = res.data;
            const { times } = response;
            setTimingList(times);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const displayTiming = () => {
        if (timingList.length === 0) return null;

        if (filter === 1) {
            return (
                <div className='timing-box day'>
                    {timingList.map((time: number, index: number) => (
                        <div key={index} className='single-timing'>
                            <span>{PRAYER_LABEL[index]}</span>
                            <span>{moment.unix(time).format('h:mm a')}</span>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div className='timing-box week'>
                    <div className='label-container'>
                        <span></span>
                        {PRAYER_LABEL.map((label: string) => (
                            <span>{label}</span>
                        ))}
                    </div>

                    <div className='scroll-container'>
                        {timingList.map((innerArray: number[], index: number) => {
                            return (
                                <div className='single-day' key={index}>
                                    <span
                                        className={`day-label ${currentDate ===
                                            moment.unix(innerArray[0]).format('D MMM YYYY')
                                            ? 'highlight'
                                            : ''
                                            } `}
                                    >
                                        {moment.unix(innerArray[0]).format('D/M/YYYY')}
                                    </span>
                                    {innerArray.map((item: number, innerIndex: number) => {
                                        return (
                                            <div key={innerIndex} className='single-timing'>
                                                <span
                                                    className={`${currentDate ===
                                                        moment.unix(item).format('D MMM YYYY')
                                                        ? 'highlight'
                                                        : ''
                                                        }`}
                                                >
                                                    {moment.unix(item).format('h:mm a')}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    };

    const resetLocation = () => {
        setShowLanding(true);
    };

    const changeFilter = (index: number) => {
        setIsLoading(true);
        setFilter(index);
    };

    const convertHijriDate = async () => {
        const gDate = moment().format('D-M-YYYY');

        try {
            const res = await getHijriDate(gDate);
            const { status, data } = res;
            if (status !== 200) throw new Error('Error fetching hijri date.');

            const hijriObj = data.data.hijri;
            const hijriDateArr = hijriObj.date.split('-');
            const hijriMonth = HIJRI_MONTH[hijriDateArr[1] - 1];
            const hijriDateString = `${parseInt(hijriDateArr[0], 10).toString()} ${hijriMonth} ${hijriDateArr[2]}`;
            setHjDate(hijriDateString);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className='container timing-container'>
            {state === 'Wilayah Persekutuan' ? (
                <p>Waktu solat bagi kawasan {state} {zone}</p>
            ) : (
                <p>Waktu solat bagi kawasan {zone}, {state}</p>
            )}

            <p>
                {currentDate} {hjDate !== '' && '/'} {hjDate !== '' && hjDate}
            </p>

            <div className='filter-box'>
                <button disabled={filter === 1} onClick={() => changeFilter(1)}>
                    Today
                </button>
                <button disabled={filter === 2} onClick={() => changeFilter(2)}>
                    Week
                </button>
                <button disabled={filter === 3} onClick={() => changeFilter(3)}>
                    Month
                </button>
            </div>

            {!isLoading && displayTiming()}
        </div>
    );
};

export default TimingList;