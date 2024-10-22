import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import localeData from 'dayjs/plugin/localeData';
import { prisma } from '../prisma';

dayjs.extend(localeData);
dayjs.locale('pt-br');

export async function getAccessData() {
    const accessData = await prisma.accessLog.groupBy({
        by: ['deviceType', 'browser', 'createdAt'],
        _count: {
            id: true,
        },
        where: {
            createdAt: {
                gte: dayjs().startOf('day').subtract(6, 'days').toDate(),
            },
        },
    });

    const shortWeekdays = {
        'segunda-feira': 'Segunda',
        'terça-feira': 'Terça',
        'quarta-feira': 'Quarta',
        'quinta-feira': 'Quinta',
        'sexta-feira': 'Sexta',
        sábado: 'Sábado',
        domingo: 'Domingo',
    };

    const last7Days = [...Array(7)].map(
        (_, i) =>
            shortWeekdays[
                dayjs()
                    .startOf('day')
                    .subtract(6 - i, 'days')
                    .format('dddd')
            ]
    );

    const mobileCounts = Array(7).fill(0);
    const desktopCounts = Array(7).fill(0);
    const browserCounts = {};

    accessData.forEach((access) => {
        const formattedCreatedAt = dayjs(access.createdAt)
            .startOf('day')
            .format('dddd');
        const index = last7Days.indexOf(shortWeekdays[formattedCreatedAt]);

        if (index !== -1) {
            if (access.deviceType === 'MOBILE') {
                mobileCounts[index] += access._count.id;
            } else if (access.deviceType === 'DESKTOP') {
                desktopCounts[index] += access._count.id;
            }

            const browserName =
                access.browser === 'Unknown' ? 'Outros' : access.browser;

            if (!browserCounts[browserName]) {
                browserCounts[browserName] = 0;
            }
            browserCounts[browserName] += access._count.id;
        }
    });

    const totalMobileAccesses = mobileCounts.reduce(
        (acc, count) => acc + count,
        0
    );
    const totalDesktopAccesses = desktopCounts.reduce(
        (acc, count) => acc + count,
        0
    );
    const totalAccesses = totalMobileAccesses + totalDesktopAccesses;

    return {
        mobile: mobileCounts,
        desktop: desktopCounts,
        browser: browserCounts,
        dates: last7Days,
        totalMobileAccesses,
        totalDesktopAccesses,
        totalAccesses,
    };
}
