import { extract } from '@extractus/article-extractor'
import { htmlToText } from 'html-to-text'

export interface ExtractedArticle {
    title?: string
    url: string
    content?: string // HTML 원문
    text?: string    // 변환된 순수 텍스트
    author?: string
    published?: string
}

export class ExtractorUtil {
    async extractArticle(url: string): Promise<ExtractedArticle | null> {
        try {
            const article = await extract(url)

            if (!article || !article.content) {
                console.warn(`내용이 추출되지 않았습니다: ${url}`)
                return null
            }

            const text = htmlToText(article.content, {
                wordwrap: 130,
                selectors: [
                    { selector: 'a', options: { ignoreHref: true } }, // 링크 href 제거
                ],
            })

            return {
                title: article.title,
                url,
                content: article.content,
                text,
                author: article.author,
                published: article.published,
            }
        } catch (error) {
            console.error(`기사 추출 실패: ${url}`, error)
            return null
        }
    }
}