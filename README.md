# P0001

## Decsription

[Live DMEO](https://jaeyolin.github.io/P0001)

## Folder Structure

```
管理者相關頁面不實作 i18n。
使用舊版 jQuery@1.11.3、Bootstrap@3.3.6

.
├── src                                      # 靜態頁面
│    ├── admin                               # 管理者頁面
│    │     └── lottery.html                  # 球球
│    ├── assets                              # JS, CSS
│    ├── i18n                                # 多國語系
│    │     ├── en_US.json                    
│    │     ├── vi_VN.json                    
│    │     └── zh_TW.json                    
│    ├── libs                                # 下載的套件
│    └── index.html                          # 首頁
├── .gitignore                             
├── package-lock.json                            
├── package.json                            
└── README.md                              
```

## Command Line 

### Deploy to gh-pages

```
npm run deploy
```