import pandas as pd
import json

# 엑셀 파일 읽기 (첫 번째 시트 기준)
df = pd.read_excel("ViralC_일괄등록_배포_261026.xlsx", sheet_name=0)

data = []
for index, row in df.iterrows():
    # 상품설명(F행) 가져오기 및 문자열 변환
    raw_desc = str(row.iloc[5]) if pd.notna(row.iloc[5]) else ""
    
    # 혹시 모를 이스케이프된 따옴표나 백슬래시 정돈
    clean_desc = raw_desc.replace('\\"', '"').replace('\\\\', '\\')

    item = {
        "brand": str(row.iloc[1]),      # B행: 브랜드명
        "name": str(row.iloc[2]),       # C행: 상품명
        "price": row.iloc[3],           # D행: 판매가
        "desc": clean_desc,             # F행: 정제된 상품설명 (HTML)
        "image": str(row.iloc[6])       # G행: 대표이미지 URL
    }
    data.append(item)

# JSON 파일로 저장 (한글 깨짐 방지)
with open('products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"총 {len(data)}개의 상품 데이터가 변환되었습니다.")