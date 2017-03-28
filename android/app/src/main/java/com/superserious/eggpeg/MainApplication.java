package com.superserious.eggpeg;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.branch.rnbranch.RNBranchPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// import Branch and RNBranch
import io.branch.referral.Branch;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNBranchPackage(),
            new RNSoundPackage(),
            new RNDeviceInfo(),
            new InAppBillingBridgePackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      Branch.getAutoInstance(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
