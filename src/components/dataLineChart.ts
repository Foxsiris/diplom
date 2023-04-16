export const dataLineChart = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Сумарные выбросы с завода 1',
            backgroundColor: '#f87979',
            data: [40, 39, 200, 40, 39, 20, 17]
        },
        {
            label: 'Сумарные выбросы с завода 2',
            backgroundColor: '#188fd9',
            data: [45, 32, 13, 45, 9, 10, 18]
        },
        {
            label: 'Сумарные выбросы с завода 3',
            backgroundColor: '#277a1a',
            data: [47, 31, 40, 90, 59, 55, 16]
        },
        {
            label: 'Сумарные выбросы с завода 4',
            backgroundColor: '#859612',
            data: [66, 29, 70, 20, 35, 15, 19]
        },

    ]
}

export const optionsLineChart = {
    responsive: true,
    maintainAspectRatio: false
}
