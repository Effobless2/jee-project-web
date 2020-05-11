export interface URLDatas {
    path: string
    title: string
}

export const ROUTES = {
    root:     {path: ''         , title:''         }, 
    beers:    {path: 'beers'    , title:'Beerary'    }, 
    shops:    {path: 'shops'    , title:'Shops'    }, 
    about:    {path: 'about'    , title:'About Us'    }, 
    beerForm: {path: 'beer-form', title:'New Beer'}, 
    shopForm: {path: 'shop-form', title:'New Shop'}, 
}