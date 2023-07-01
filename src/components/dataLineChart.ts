export const dataLineChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July','Augs','Sep','Oct','Nov'],
    datasets: [
        {
            label: 'Сумарные выбросы с Источника 1',
            backgroundColor: '#f87979',
            data: [40, 39, 200, 40, 39, 20, 17,55,12,11,33,44]
        },
        {
            label: 'Сумарные выбросы с Источника 2',
            backgroundColor: '#188fd9',
            data: [40, 39, 200, 40, 39, 20, 17,5,2,11,3,4]
        },

    ]
}

export const optionsLineChart = {
    responsive: true,
    maintainAspectRatio: false
}
