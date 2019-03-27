// tslint:disable

declare global {
    interface Window {
        hj: any;
        _hjSettings: any;
    }
}

export class Hotjar {
    constructor(private hjId: string) {

    }

    init() {
        let hjId = this.hjId;

        // <!-- Hotjar Tracking Code for https://ethereum.ethstats.io/ -->
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid: hjId,hjsv:6};
            // @ts-ignore
            a=o.getElementsByTagName('head')[0];
            // @ts-ignore
            r=o.createElement('script');r.async=1;
            // @ts-ignore
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            // @ts-ignore
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
}
