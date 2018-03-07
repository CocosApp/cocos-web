export class BaseComponent{
  prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'loginPage'; 
  }
}