export default function getCatalogueData() {

    const catalogueData = [
        {
            name: 'Under-sole canting',
            img: require('../img/catalogue/plates.png'),
            link: '/undersole'
        },
        {
            name: 'Cuff canting',
            description: 'Open-source crypto trading bot',
            img: require('../img/catalogue/inserts.png'),
            link: '/cuff'        
        },
        {
            name: 'Binding specific',
            description: 'Strategy backtesting simulator and historical data downloader',
            img: require('../img/catalogue/plates.png'),
            link: "/binding"    
         },
        {
            name: 'Tools',
            description: 'Textract-waveapp integration for automated invoice creation from standardized purchase orders',
            img: require('../img/catalogue/plates.png'),
            link: '/tools'        
        },        
    ]

    return catalogueData
}