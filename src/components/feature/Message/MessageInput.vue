<template>
    <div class="flex items-center gap-3">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Zakk Wylde"
            class="w-10 h-10 rounded-full" />
        <div class="flex-1 flex items-center gap-2">
            <div class="flex-1 relative">
                <Input placeholder="Start a new message"
                    class="pr-10 border-[#e8e8e8] bg-[#fbfbfd] placeholder:text-[#c4c4c4]" />
                <Button size="sm" variant="ghost"
                    class="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
                    <Smile class="w-4 h-4 text-[#4f5665]" />
                </Button>
            </div>
            <Button size="sm" class="bg-[#21978b] hover:bg-[#1a7a6f] h-10 w-10 p-0">
                <Send class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>