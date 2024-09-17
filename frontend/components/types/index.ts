export type openDropdownType = "solutions"|"products"|"resources"|null

export type Zap = {
    "id":string,
    "triggerId":string,
    "userId":number,
    "actions": {
        "id":string,
        "zapId":string,
        "actionId":string,
        "sortingOrder":number,
        "type":{
            "id":string,
            "name":string,
            "image":string
        }
    }[],
    "trigger":{
        "id":string,
        "zapId":string,
        "triggerId":string,
        "type":{
            "id":string,
            "name":string,
            "image":string
        }
    }
}