#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(AirDropModule, NSObject)

RCT_EXTERN_METHOD(sendPhoneNumber:(NSString *)phoneNumber resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(receivePhoneNumber:(RCTResponseSenderBlock)callback)

@end
