import { Component, OnInit } from '@angular/core';
import { Tag } from './../../../core/models/Tag';
import { TagsService } from './../../../core/services/posts-services/tags.service';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.css'],
  standalone: false
})
export class PopularTagsComponent implements OnInit {
  /**
   * @param tags Tag[]
   */
  public tags: Tag[] = [];

  /**
   * @param _tagsService TagsService
   */
  constructor(private _tagsService: TagsService) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._getTags();
  }

  /**
   * Get tags.
   */
  private _getTags(): void {
    this.tags = this._tagsService.getTags().slice(0, 5);
  }
}
