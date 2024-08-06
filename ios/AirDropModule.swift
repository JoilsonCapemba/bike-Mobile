import Foundation
import UIKit
import React

@objc(AirDropModule)
class AirDropModule: NSObject {
  @objc func sendPhoneNumber(_ phoneNumber: NSString, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if let rootViewController = UIApplication.shared.keyWindow?.rootViewController {
        let activityViewController = UIActivityViewController(activityItems: [phoneNumber], applicationActivities: nil)
        activityViewController.completionWithItemsHandler = { activity, completed, items, error in
          if completed {
            resolver("Success")
          } else if let error = error {
            rejecter("ERROR", "Failed to share phone number", error)
          } else {
            rejecter("CANCELLED", "Sharing was cancelled", nil)
          }
        }
        rootViewController.present(activityViewController, animated: true, completion: nil)
      } else {
        rejecter("NO_VIEW_CONTROLLER", "No view controller available", nil)
      }
    }
  }

  @objc func receivePhoneNumber(_ callback: @escaping RCTResponseSenderBlock) {
    NotificationCenter.default.addObserver(forName: NSNotification.Name("AirDropReceived"), object: nil, queue: nil) { notification in
      if let userInfo = notification.userInfo, let phoneNumber = userInfo["phoneNumber"] as? String {
        callback([phoneNumber])
      } else {
        callback([NSNull()])
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
