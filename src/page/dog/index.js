import { Button, Image, Spin } from "antd";
import { observer, useLocalObservable } from "mobx-react";
import store from "./store";

/*狗组件*/
const Dog = () => {
  const curStore = useLocalObservable(() => store);
  return (
    <div>
      <div>
        <Button
          loading={curStore.loading}
          onClick={() => {
            curStore.otherDog();
          }}
        >
          下一只狗
        </Button>
      </div>
      <div>
        {curStore.loading ? (
          <Spin tip="数据正在请求中。。" />
        ) : (
          <Image
            width={500}
            placeholder={<Spin tip="图片正在加载中。。。"></Spin>}
            src={curStore.url}
          />
        )}
      </div>
    </div>
  );
};

export default observer(Dog);
