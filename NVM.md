<img width="578" alt="nvm-logo" src="https://user-images.githubusercontent.com/31315644/83472212-ac9f8400-a4c1-11ea-8554-a6b74e88a2a4.png">



-------------

# 자연스럽게 Node Version 바꾸기 🍃 (feat. nvm)

## 목차

- [개요](#tutorial)
- [Step 1. nvm 설치 사전준비](#a1)
- [Step 2. nvm 설치](#a2)
- [Step 3. nvm 설치 확인](#a3)
  1. [환경변수 설정 추가하기](#a3-1)
  2. [환경변수 설정 적용하기](#a3-2)
- [Step 4. nvm을 이용하여 Node.js 설치하기](#a4)
  - [명령어](a4-keyword)
- [Step 5. nvm을 이용해서 프로젝트에 버전 명시하기](#a5)
- [Step 6. 노드 버전 변경 테스트하기](#a6)
  - [테스트 시나리오](#a6-1)
- [Step 7. 노드 버전 자동 변경 구축하기](#a7)
  - [자동 변경 환경 구축하기](#a7-1)
  - [자동 변경 환경 테스트](#a7-2)

------------

## 개요 <a id="tutorial"></a>

<img width="650" alt="nvm" src="https://user-images.githubusercontent.com/31315644/83472243-bd4ffa00-a4c1-11ea-9230-fdf7087f55a4.png">

**간혹 프로젝트에서 위와같은  `.nvmrc` 파일을 보신 적이 있으신가요?** 🧐

`.nvmrc`파일을 열어보면 고작, 10글자도 안되는 숫자를 나열하고 있습니다. 

`.nvmrc` 는 해당 프로젝트가 어떠한 노드 버전을 사용하는지 명시를 하는 것 입니다.

처음 프로젝트를 진행한 개발자 혹은 기획자가 이러한 노드 버전을 사용하고자 명시를 한 것이죠. 

추후 프로젝트를 협업등을 통해 다른 사람이 리펙토링, 개선, 추가 기능 등의 개발을 할 때 해당 프로젝트를 클론해서 사용할텐데 서로 개발환경을 맞춤으로써 오류를 최대한 피하고자 하는 취지로 만들어진것 입니다.

예를들어, 위 사진의 프로젝트는 노드버전 `11.10.1` 을 사용하고 있네요! 

<br/>

## Step 1. nvm 설치 사전준비 <a id="a1"></a>

- **Mac OS 카탈리나 10.15.5**을 사용하고 있습니다. 🤓
- Homebrew 을 자주 사용합니다. 😄
- zsh을 사랑합니다. ❤️

`.nvmrc`를 좀 더 편리하게 사용하기 위해서는 `nvm`을 설치해야합니다. 

그러면 `nvm`을 설치하기 이전에, `Homebrew`를 먼저 설치합니다.

**만약, 이미 설치되어있거나 `Homebrew` 를 설치하고 싶지 않으신분은 [Step 2](#a2)로 넘어가주세요.**

[Homebrew 설치하기](https://brew.sh/index_ko.html)

사이트 가셔서 설치방법대로 설치하셔도 되고, 아래 스크립트를 터미널에 붙여넣으셔도 됩니다.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

`Homebrew`를 설치하지 않고도 `nvm`을 설치하는 방법이 있으나 `Homebrew`는 설치를 해두면 요긴하게 사용할 일이 정말 많으니 깔아두시는 것을 추천합니다.

<br/>

## Step 2. nvm 설치  <a id="a2"></a>

그러면 먼저 `NVM`(Node Version Manager 이하 nvm)을 설치하도록 하겠습니다.

터미널을 열고 아래 스크립트를 실행합니다. (`Homebrew` 설치 가정)

```bash
brew install nvm
```

만약 `Homebrew`를 설치를 안하셨다면 다음 스크립트를 터미널에서 실행합니다.

```bash
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

<br/>

## Step 3. nvm 설치 확인  <a id="a3"></a>

터미널을 열고 다시 아래 스크립트를 실행해봅니다.

```bash
nvm --version
```

- command not found 관련 오류가 발생했다면 [3-1](#a3-1)로 넘어가주세요. 
- 오류가 발생하지 않고 제대로 버전이 체크 되었다면 [Step 4](#a4)로 넘어가주세요.

<br/>

### 3-1. 환경변수 설정 추가하기 <a id="a3-1"></a>

**만약 다음과 같은 오류가 생겼다면 환경변수를 추가해야합니다. 버전체크가 제대로 되신 분은 스킵하셔도 됩니다.**

```bash
-bash: nvm: command not found
zsh: command not found: nvm
```

각자 환경에 맞는 쉘에서 다음 스크립트를 실행합니다. 

- **bash**

  ```bash
  vi ~/.bash_profile  
  ```

  export 관련 코드는 맨 마지막줄에 삽입하면 됩니다. 

  ```bash
  export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
  ```

- **zsh**

  ```zsh
  vi ~/.zshrc
  ```
  
  export 관련 코드는 맨 마지막줄에 삽입하면 됩니다. 
  
  ```zsh
  export NVM_DIR="$HOME/.nvm"source $(brew --prefix nvm)/nvm.sh
  ```

<br/>

### 3-2. 환경변수 설정 적용하기  <a id="a3-2"></a>

**환경변수를 적용합니다. 버전체크가 제대로 되신 분은 스킵하셔도 됩니다.**

- **bash**

  ```bash
  source ~/.bash_profile
  ```

- **zsh**

  ```zsh
  source ~/.zshrc
  ```

<br/>

## Step 4. nvm을 이용하여 Node.js 설치하기 <a id="a4"></a>

> nvm을 이용하여 다양한 버전의 Node버전을 관리할 수 있습니다.

### 명령어  <a id="a4-keyword"></a>

```bash
nvm install v[설치버전]
## 설치 : nvm install v11.10.1

nvm uninstall v[설치버전]
## 삭제 : nvm uninstall v11.10.1

nvm use v[사용할 버전]
## 사용 : nvm use v6.10.1, .nvmrc가 명시되어있다면 그냥 nvm use만 하셔도됩니다.

nvm ls 
## 현재 설치된 노드 버전 리스트를 보여줍니다.

nvm alias default v[설치버전]
## 터미널 시작시 노드 기본버전 설정

node --v
## 노드 버전 확인

nvm --version
## nvm 버전 확인
```

추가적인 명령어 및 자세한 사항은 [nvm github](https://github.com/nvm-sh/nvm) 을 참조 바랍니다.

<br/>

## Step 5. nvm을 이용해서 프로젝트에 버전 명시하기  <a id="a5"></a>

본격적으로 프로젝트에 노드 버전을 명시하도록 하겠습니다.

프로젝트 루트 위치에 `.nvmrc` 파일을 생성합니다.

터미널로 하여 `touch` 명령어를 사용하셔도 되고, 코드 편집기를 이용하여 파일 생성을 하셔도 됩니다.

.nvrmc 파일을 생성하고 버전을 명시한 후 저장하시면 됩니다.

<img src="https://user-images.githubusercontent.com/31315644/83476453-c6de5f80-a4cb-11ea-90e1-5634c74db596.jpeg" alt="nvm-example" style="zoom:50%;" />



<br/>

## Step 6. 노드 버전 변경 테스트하기  <a id="a6"></a>

테스트를 하기 위해서 리액트 프로젝트를 6개를 각각 만들고 1개를 제외한 5개의 프로젝트 내에 .nvmrc 파일을 생성하겠습니다.

파일명-노드버전의 이름으로 프로젝트를 명시하겠습니다.

<br/>

### 테스트 시나리오 <a id="a6-1"></a>

> 각 프로젝트 폴더를 이동하면서 `nvm use`명령어를 통해 노드버전이 바뀌고 있는지를 확인해보십니다.

- test1, test2, test3 프로젝트는 .nvmrc파일을 생성되있고 명시한 노드버전이 이미 설치가 되어있는 상황입니다.
- test4 프로젝트는 .nvmrc 파일을 생성하지 않았습니다.
- test5 프로젝트는 .nvmrc 파일이 존재하나 명시한 노드버전이 설치 되어있지 않은 상황입니다.
- test6 프로젝트는 .nvmrc 파일이 존재하나 명시한 노드버전이 설치 되어있지 않은 상황입니다. 추가로 폴더 이동시 자동으로 node 버전을 변경하는 테스트를 진행해봅니다.

<img src="https://user-images.githubusercontent.com/31315644/83475804-1ae84480-a4ca-11ea-8c56-84a678a9a04b.jpeg" alt="nvm-test" style="zoom:50%;" />

<br/>

#### test1, test2, test3 

> .nvmrc파일을 생성되있고 명시한 노드버전이 이미 설치가 되어있는 상황.

모두 각 프로젝트마다 `nvm use` 명령어를 통해 노드 버전이 제대로 바뀌는 것을 확인하였습니다.

<img width="1711" alt="node-test" src="https://user-images.githubusercontent.com/31315644/83477017-1a04e200-a4cd-11ea-8fdd-2804598738c1.png">

<br/>

#### test4

>  .nvmrc 파일을 생성되있지 않는 상황.

`.nvmrc` 파일을 찾을 수 없다는 에러를 표기합니다.

<img src="https://user-images.githubusercontent.com/31315644/83476854-b7134b00-a4cc-11ea-8966-7ba64f1c42cd.jpeg" alt="node-test4" style="zoom:50%;" />

<br/>

#### test5

>  .nvmrc 파일이 존재하나 명시한 노드버전이 설치 되어있지 않은 상황.

해당 버전이 설치 되있지 않으니, `nvm install [노드설치버전]` 명령어를 통해 해당 버전을 설치하도록 유도하는 메시지를 보여줍니다.

<img src="https://user-images.githubusercontent.com/31315644/83476839-b24e9700-a4cc-11ea-8e3e-276c6813223b.jpeg" alt="node-test5" style="zoom:50%;" />

<br/>

## Step 7. 노드 버전 자동 변경 구축하기 <a id="a7"></a>

Step 6까지만 이용하셔도 충분히 개발하는데 많이 편리해졌습니다. 

하지만, 굳이 프로젝트를 이동할때마다 `nvm use` 명령어를 사용하는 번거로움이 아직 존재합니다.

이 부분을 해소해봅시다.

먼저 해소하기 위해 몇가지 설정을 추가해야만 합니다.

각자 사용하는 쉘에 맞춰 환경구축을 해주시면 됩니다. 저에 경우 zsh을 이용하고 있습니다.

<br/>

### 자동 변경 환경 구축하기 <a id="a7-1"></a>

- **zsh**

  ```zsh
  vi ~/.zshrc
  ```

  ```zsh
  # place this after nvm initialization!
  autoload -U add-zsh-hook
  load-nvmrc() {
    local node_version="$(nvm version)"
    local nvmrc_path="$(nvm_find_nvmrc)"
  
    if [ -n "$nvmrc_path" ]; then
      local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
  
      if [ "$nvmrc_node_version" = "N/A" ]; then
        nvm install
      elif [ "$nvmrc_node_version" != "$node_version" ]; then
        nvm use
      fi
    elif [ "$node_version" != "$(nvm version default)" ]; then
      echo "Reverting to nvm default version"
      nvm use default
    fi
  }
  add-zsh-hook chpwd load-nvmrc
  load-nvmrc
  ```

  vi 를 나온 뒤 아래 스크립트를 터미널에 추가로 입력합니다.

  ```zsh
  source ~/.zshrc
  ```

- **bash**

  ```bash
  vi ~/.bash_profile
  ```

  ```bash
  find-up () {
      path=$(pwd)
      while [[ "$path" != "" && ! -e "$path/$1" ]]; do
          path=${path%/*}
      done
      echo "$path"
  }
  
  cdnvm(){
      cd "$@";
      nvm_path=$(find-up .nvmrc | tr -d '[:space:]')
  
      # If there are no .nvmrc file, use the default nvm version
      if [[ ! $nvm_path = *[^[:space:]]* ]]; then
  
          declare default_version;
          default_version=$(nvm version default);
  
          # If there is no default version, set it to `node`
          # This will use the latest version on your machine
          if [[ $default_version == "N/A" ]]; then
              nvm alias default node;
              default_version=$(nvm version default);
          fi
  
          # If the current version is not the default version, set it to use the default version
          if [[ $(nvm current) != "$default_version" ]]; then
              nvm use default;
          fi
  
          elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
          declare nvm_version
          nvm_version=$(<"$nvm_path"/.nvmrc)
  
          declare locally_resolved_nvm_version
          # `nvm ls` will check all locally-available versions
          # If there are multiple matching versions, take the latest one
          # Remove the `->` and `*` characters and spaces
          # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
          locally_resolved_nvm_version=$(nvm ls --no-colors "$nvm_version" | tail -1 | tr -d '\->*' | tr -d '[:space:]')
  
          # If it is not already installed, install it
          # `nvm install` will implicitly use the newly-installed version
          if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
              nvm install "$nvm_version";
          elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
              nvm use "$nvm_version";
          fi
      fi
  }
  alias cd='cdnvm'
  ```

  vi 를 나온 뒤 아래 스크립트를 터미널에 추가로 입력합니다.

  ```bash
  source ~/.bash_profile
  ```

<br/>

### 자동 변경 환경 테스트  <a id="a7-2"></a>

> test6 : .nvmrc 파일이 존재하나 명시한 노드버전이 설치 되어있지 않은 상황입니다. 추가로 폴더 이동시 자동으로 node 버전을 변경하는 테스트를 진행해봅니다.

- default node version : 11.15.0
- test1 : 12.11.1 (설치 ⭕️)
- test6 : 14.1.0 (설치 ❌)

**결과**

- 이미 설치되어있는 노드 버전의 경우, 아래 처럼 폴더 접속시 .nvmrc에 명시된 node 버전으로 변경시켜줍니다. (12.11.1)
- 폴더에서 나올 경우, nvm에 명시된 기본 노드버전으로 변경시켜줍니다. (11.15.0)
- 만약 .nvmrc가 명시되어있는 폴더에서 설치가 안된 노드버전의 경우  `nvm install` 명령을 통하여 해당 노드 버전을 자동으로 설치하고 변경시켜줍니다. 

<img src="https://user-images.githubusercontent.com/31315644/83482222-b7b2de00-a4da-11ea-9106-1590f9b95988.jpeg" alt="node-lastTest" style="zoom:50%;" />

<br/>

여기까지 nvm 을 이용한 노드 버전관리 소개였습니다. 기존에는 .nvmrc로 명시만 하고 실제로는 마구잡이식 개발을 하였었는데요.

협업을 통해서 다른 사람의 프로젝트를 받아보고 사용하다보니 환경을 서로 맞춰놓고 시작하는게 얼마나 중요한지 깨닫게 되었습니다.

이 글을 통해서 노드버전에 대해서 편리함을 느끼시고 조금이나 도움이 되셨으면 좋겠습니다.

**더 나은 개발과 지식 공유를 위해 부족하거나 잘못된 점은 피드백을 남겨주시면 감사하겠습니다.** 🙏🙏 

-------------

## Reference

- https://github.com/nvm-sh/nvm